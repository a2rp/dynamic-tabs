import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import tabsContent from "./tabs-content.json";
import styles from "./styles.module.scss";

const footerLinks = [
    { label: "Portfolio", href: "https://www.ashishranjan.net/", icon: "◎" },
    { label: "GitHub", href: "https://github.com/a2rp", icon: "◉" },
    { label: "CodePen", href: "https://codepen.io/ash1198", icon: "⌘" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aashishranjan", icon: "in" },
    { label: "Facebook", href: "https://www.facebook.com/theash.ashish/", icon: "f" },
    { label: "YouTube", href: "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", icon: "▶" },
    { label: "Email", href: "mailto:ash.ranjan09@gmail.com", icon: "✉" },
    { label: "Support", href: "https://a2rp-donation-page.netlify.app/", icon: "♥" },
    { label: "Buy Me a Coffee", href: "https://buymeacoffee.com/a2rp", icon: "☕" },
    { label: "Patreon", href: "https://www.patreon.com/a2rp", icon: "★" },
];

const DynamicTabs = () => {
    const [tabId, setTabId] = useState(tabsContent[0]?.id ?? 0);
    const [tabContent, setTabContent] = useState(tabsContent[0]?.content ?? "");
    const [showTopButton, setShowTopButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowTopButton(window.scrollY > 280);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleTabClick = (id) => {
        const selectedTab = tabsContent.find((item) => item.id === id);
        setTabId(id);
        setTabContent(selectedTab?.content ?? "");
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <a className={styles.brand} href="./" aria-label="Dynamic Tabs home">
                    <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Ashish Ranjan logo" />
                    <span>
                        <strong>Dynamic Tabs</strong>
                        <small>Programming language reference</small>
                    </span>
                </a>
                <a className={styles.headerLink} href="https://github.com/a2rp/dynamic-tabs" target="_blank" rel="noopener noreferrer">
                    <span aria-hidden="true">◉</span>
                    <span>Source</span>
                </a>
            </header>

            <main className={styles.main}>
                <section className={styles.intro}>
                    <span className={styles.eyebrow}>LEARN BY COMPARING</span>
                    <h1>Dynamic tabs for programming languages</h1>
                    <p>Switch between structured language notes without leaving the page.</p>
                </section>

                <div className={styles.tabHeaderContainer} role="tablist" aria-label="Programming languages">
                    {tabsContent.map((item) => (
                        <button
                            type="button"
                            role="tab"
                            aria-selected={tabId === item.id}
                            key={item.id}
                            onClick={() => handleTabClick(item.id)}
                            className={`${styles.tab} ${tabId === item.id ? styles.activeTab : ""}`}
                        >
                            {item.tab}
                        </button>
                    ))}
                </div>

                <section className={styles.tabContentContainer} role="tabpanel" aria-live="polite">
                    {parse(tabContent)}
                </section>

                <footer className={styles.footer}>
                    <div>
                        Copyright © {new Date().getFullYear()} {" "}
                        <a href="https://www.ashishranjan.net/" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a>
                    </div>
                    <nav className={styles.footerLinks} aria-label="Footer links">
                        {footerLinks.map(({ label, href, icon }) => (
                            <a key={label} href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"} aria-label={label} title={label}>{icon}</a>
                        ))}
                    </nav>
                </footer>
            </main>

            <button className={`${styles.goTop} ${showTopButton ? styles.show : ""}`} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Go to top" title="Go to top">↑</button>
        </div>
    );
};

export default DynamicTabs;
