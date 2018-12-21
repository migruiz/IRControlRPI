FROM resin/raspberrypi3-debian
RUN [ "cross-build-start" ]



RUN apt-get update && \
apt-get install -yqq --no-install-recommends g++ gcc make wget python-dev && rm -rf /var/lib/apt/lists/*

RUN  apt -yqq install python-pip

RUN mkdir /python-broadlink

COPY python-broadlink /python-broadlink

RUN cd /rm3 \
&& make 



RUN [ "cross-build-end" ]  



EXPOSE 8883 

ENTRYPOINT ["mosquitto"]
