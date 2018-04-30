package com.kenny.hodlinvest.database;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class DynamoClient {
    private AWSCredentialsProvider credentialsProvider;
    private AmazonDynamoDB amazonDynamoDB;

    private AmazonS3 s3client;
    private DynamoDB dynamoDB;

    @Value("${cloud.aws_access_key_id}")
    private String awsAcessKeyID;
    @Value("${cloud.aws_secret_access_key}")
    private String awsSecretKey;
    @Value("${cloud.dynamoDB_table_name_tokens}")
    private String tokensTableName;
    @Value("${cloud.dynamoDB_table_name_users}")
    private String usersTableName;

    public DynamoClient(){
        credentialsProvider = new AWSStaticCredentialsProvider(new AWSCredentials() {
            @Override
            public String getAWSAccessKeyId() {
                return awsAcessKeyID;
            }

            @Override
            public String getAWSSecretKey() {
                return awsSecretKey;
            }
        });

        amazonDynamoDB = AmazonDynamoDBClientBuilder
                .standard()
                .withRegion(Regions.US_EAST_1)
                .withCredentials(credentialsProvider)
                .build();
        s3client = AmazonS3ClientBuilder
                .standard()
                .withRegion(Regions.US_EAST_1)
                .withCredentials(credentialsProvider)
                .build();

        dynamoDB = new DynamoDB(amazonDynamoDB);

    }

    public AmazonDynamoDB getAmazonDynamoDB() {
        return amazonDynamoDB;
    }

    public DynamoDB getDynamoDB() {
        return dynamoDB;
    }

    public AmazonS3 getS3client() {
        return s3client;
    }

    public String getTokenTableName(){
        return tokensTableName;
    }

    public String getUsersTableName(){
        return usersTableName;
    }
}
