# nestjs-kafka-chat



docker run -d --name zookeeper -p 2181:2181 wurstmeister/zookeeper


docker run -d --name kafka -p 9092:9092 \
--env KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
--env KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
--env KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
--env KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 \
--link zookeeper wurstmeister/kafka
