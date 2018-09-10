package com.cg.hbms.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import com.cg.hbms.exception.HbmsException;
import com.sun.rowset.JdbcRowSetImpl;




/**
 * Author 		: CAPGEMINI 
 * Class Name 	: DbConnection
 * Package 		: com.capgemini.donorapplication.utility
 * Date 		: Nov 21, 2016
 */

public class DbConnection {
	static Connection connection;
	
	public static Connection getConnection() throws HbmsException {
		try {
			/*InitialContext ic = new InitialContext();
			DataSource ds = (DataSource) ic.lookup("java:/jdbc/OracleDS2");
			conn = ds.getConnection();*/
			
			DriverManager.registerDriver(new oracle.jdbc.driver.OracleDriver());
			connection = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe","system","root");
		}

		catch (SQLException e) {
			throw new HbmsException("SQL Error:"+e.getMessage());
		}
		return connection;
	}
}
