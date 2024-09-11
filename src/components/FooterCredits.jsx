import styles from "./FooterCredits.module.css";

export default function FooterCredits() {
    return (
        <div className={styles.creditsDiv}>
            <p>
                Created by Munkleson
                <span> | </span>
                <a href="https://github.com/Munkleson" target="_blank">
                    GitHub
                </a>
                <span> | </span>
                <a href="https://github.com/Munkleson/TOP-memory-card" target="_blank">
                    Repository
                </a>
                <span> | </span>
                <a href="https://www.linkedin.com/in/alexander-wong-99574b170/" target="_blank">
                    LinkedIn
                </a>
            </p>
        </div>
    );
}
