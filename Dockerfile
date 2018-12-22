FROM resin/raspberrypi3-debian
RUN [ "cross-build-start" ]



RUN apt-get update && \
apt-get install -yqq --no-install-recommends g++ gcc make wget python-dev && apt -y install python-pip && rm -rf /var/lib/apt/lists/*


RUN mkdir /python-broadlink

COPY python-broadlink /python-broadlink

RUN cd /python-broadlink \
&& python -m pip install pycrypto  \
&& python -m pip install netaddr \
&& python setup.py install

RUN chmod +x /python-broadlink/cli/broadlink_cli
RUN chmod +x /python-broadlink/cli/broadlink_discovery

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
&& apt-get install -yqq --no-install-recommends nodejs   && rm -rf /var/lib/apt/lists/*

RUN mkdir /IRApp/


COPY IRApp/package.json  /IRApp/package.json

RUN cd /IRApp/ \
&& npm  install 

COPY IRApp /IRApp

RUN [ "cross-build-end" ]  

ENTRYPOINT ["node","/IRApp/app.js"]



