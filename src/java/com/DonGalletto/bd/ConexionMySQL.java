/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DonGalletto.bd;

import java.sql.Connection;
import java.sql.DriverManager;


public class ConexionMySQL {
    
    private Connection conn;
    public Connection open() throws Exception {
        String user = "root";
        String password = "tokis";
        String url = "jdbc:mysql://localhost:3306/undertake?" +
                "useSSL=false&" +
                "allowPublicKeyRetrieval=true&" +
                "useUnicode=true&" +
                "characterEncoding=utf-8";

        // Registrar el driver de la base de datos
        Class.forName("com.mysql.cj.jdbc.Driver");

        // Abrir una conexión con MySQL
        conn = DriverManager.getConnection(url, user, password);

        return conn;
    }

    /**
     * Cierra la conexión a la base de datos.
     */
    public void close() {
        try {
            if (conn != null && !conn.isClosed()) {
                conn.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error al cerrar la conexión a la base de datos.");
        }
    }
    public Connection getConnection() {
        return conn;
    }
}
