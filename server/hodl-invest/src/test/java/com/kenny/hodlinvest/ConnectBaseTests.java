package com.kenny.hodlinvest;

import com.kenny.hodlinvest.database.ConnectBase;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


import java.sql.ResultSet;
import java.sql.SQLException;

import static junit.framework.TestCase.fail;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ConnectBaseTests {

    @Test
    public void contextLoads() {
        try {
            ConnectBase.initDatabase();
        }catch (Exception e){
            e.printStackTrace();
        }
//        ConnectBase.runQuery("INSERT INTO public.Users VALUES('hello', 'im', 13);");
//        ConnectBase.runQuery("INSERT INTO Users VALUES('hellohellohello', 'im', 15);");
//        ConnectBase.runQuery("TRUNCATE users; DELETE FROM users;");


//        String insertNewUser = "INSERT INTO Users VALUES('hellohellohello', 'im', 15);";

//        ConnectBase.runQuery("CREATE TABLE USERS_INFO ( username varchar(16) PRIMARY key NOT null, password varchar(255) not null, name varchar(20), email varchar(60) not null, refer smallint, playMoney float(25), btc float(25), eth float(25), xrp float(25), bch float(25), ltc float(25) )");
//        ConnectBase.runQuery("drop table users_info");

//        ConnectBase.addNewUser(
//                "intellij", "fakepassword", "alex","alex@gmail.com",0,987654321.123456789,
//                987654321.123456789,987654321.123456789,987654321.123456789,987654321.123456789,987654321.123456789);

//        ConnectBase.deleteUser("intellij");

        ResultSet rs = ConnectBase.selectQuery("SELECT * FROM users_info");
        if(rs != null){
            try{
                while(rs.next()){
                    String st = rs.getString(3);
                    System.out.println(st + "------------------------------------------------------------");
                }
            }catch(SQLException e){
                e.printStackTrace();
                System.out.println("This is wrong, you are wrong, we are wrong");
                fail("Everything is wrong");
            }

        }

    }

}
