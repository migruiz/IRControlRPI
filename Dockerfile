FROM resin/raspberrypi3-debian
RUN [ "cross-build-start" ]



RUN apt-get update && \
apt-get install -yqq --no-install-recommends mosquitto  && rm -rf /var/lib/apt/lists/*



RUN [ "cross-build-end" ]  



EXPOSE 8883 

ENTRYPOINT ["mosquitto"]
