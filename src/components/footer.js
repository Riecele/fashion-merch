import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

function Footer() {
    const styles = {
        footer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1px",
        backgroundColor: "#333",
        color: "#fff",
        },
        socialIcons: {
        display: "flex",
        gap: "1rem",
        fontSize: "1.5rem",
        margin: "1rem",
        },
    };
    
    return (
        <footer style={styles.footer}>
        <div style={styles.socialIcons}>
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
            <FaYoutube />
        </div>
        <p>&copy; 2025 Shopee</p>
        </footer>
    );
    }

export default Footer;
