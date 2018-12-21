FROM resin/raspberrypi3-debian
RUN [ "cross-build-start" ]



RUN apt-get update && \
apt-get install -yqq --no-install-recommends g++ gcc make wget python-dev && rm -rf /var/lib/apt/lists/*

RUN  apt -yqq install python-pip

RUN mkdir /python-broadlink

COPY python-broadlink /python-broadlink

RUN cd /python-broadlink \
&& python -m pip install pycrypto  \
&& python -m pip install netaddr \
&& python setup.py install



RUN [ "cross-build-end" ]  



