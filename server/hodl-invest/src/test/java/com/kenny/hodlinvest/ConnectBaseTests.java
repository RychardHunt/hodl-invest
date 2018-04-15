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
        }catch (SQLException e){
            e.printStackTrace();
        }
        ConnectBase.runQuery("INSERT INTO Users VALUES('hello', 'im', 13);");
        ConnectBase.runQuery("INSERT INTO Users VALUES('hellohello', 'im', 14);");
        ConnectBase.runQuery("INSERT INTO Users VALUES('hellohellohello', 'im', 15);");
        ConnectBase.runQuery("INSERT INTO Users VALUES('hellohellohellohello', 'im', 16);");

        ResultSet rs = ConnectBase.selectQuery("SELECT * FROM Users");
        if(rs != null){
            try{
                while(rs.next()){
                    String st = rs.getString(1);
                    System.out.println(st);
                }
            }catch(SQLException e){
                e.printStackTrace();
                System.out.println("This si wrong, you are wrong, we are wrong");
                fail("Everything is wrong");
            }

        }

    }

}
