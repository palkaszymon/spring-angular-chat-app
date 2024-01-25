package pl.palkaszymon.chat.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories(
        basePackages = "pl.palkaszymon.chat.persistence.repository",
        mongoTemplateRef = "userMongoTemplate")
@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {
    @Value("${spring.data.mongodb.database}")
    private String dbName;

    @Value("${spring.data.mongodb.host}")
    private String dbHost;

    @Value("${spring.data.mongodb.port}")
    private String dbPort;

    @Value("${spring.data.mongodb.uuid-representation}")
    private String uuidRepresentation;

    @Override
    protected String getDatabaseName() {
        return dbName;
    }

    @Bean(name = "userMongoTemplate")
    public MongoTemplate mongoTemplate() {
        return new MongoTemplate(new SimpleMongoClientDatabaseFactory(String.format("mongodb://%s:%s/%s?uuidRepresentation=%s", dbHost, dbPort, dbName, uuidRepresentation)));
    }
}