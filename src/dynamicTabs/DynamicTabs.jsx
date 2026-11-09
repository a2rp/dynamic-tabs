import React, { useEffect, useRef, useState } from "react";
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
    const [tabId, setTabId] = useState(tabsContent[0]?.id ?? null);
    const [showTopButton, setShowTopButton] = useState(false);
    const tabRefs = useRef(new Map());
    const selectedTab = tabsContent.find((item) => item.id === tabId) ?? tabsContent[0];

    useEffect(() => {
        const handleScroll = () => setShowTopButton(window.scrollY > 280);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleTabClick = (id) => {
        setTabId(id);
    };

    const handleTabKeyDown = (event, currentIndex) => {
        let nextIndex;

        if (event.key === "ArrowRight") {
            nextIndex = (currentIndex + 1) % tabsContent.length;
        } else if (event.key === "ArrowLeft") {
            nextIndex = (currentIndex - 1 + tabsContent.length) % tabsContent.length;
        } else if (event.key === "Home") {
            nextIndex = 0;
        } else if (event.key === "End") {
            nextIndex = tabsContent.length - 1;
        } else {
            return;
        }

        event.preventDefault();
        const nextTab = tabsContent[nextIndex];
        handleTabClick(nextTab.id);
        tabRefs.current.get(nextTab.id)?.focus();
    };

    const scrollToPageTop = () => {
        const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <a className={styles.brand} href="./" aria-label="Dynamic Tabs home">
                    <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Ashish Ranjan logo" />
                    <span>
                        <strong>Dynamic Tabs</strong>
                            <small>Programming paradigms</small>
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
                    <h1>Programming language paradigms</h1>
                    <p>Compare concise notes and examples without leaving the page.</p>
                </section>

                <div className={styles.tabHeaderContainer} role="tablist" aria-label="Programming paradigms">
                    {tabsContent.map((item, index) => (
                        <button
                            type="button"
                            role="tab"
                            id={`language-tab-${item.id}`}
                            aria-controls="language-tabpanel"
                            aria-selected={tabId === item.id}
                            tabIndex={tabId === item.id ? 0 : -1}
                            ref={(node) => {
                                if (node) tabRefs.current.set(item.id, node);
                                else tabRefs.current.delete(item.id);
                            }}
                            key={item.id}
                            onClick={() => handleTabClick(item.id)}
                            onKeyDown={(event) => handleTabKeyDown(event, index)}
                            className={`${styles.tab} ${tabId === item.id ? styles.activeTab : ""}`}
                        >
                            {item.tab}
                        </button>
                    ))}
                </div>

                <section
                    id="language-tabpanel"
                    className={styles.tabContentContainer}
                    role="tabpanel"
                    aria-labelledby={selectedTab ? `language-tab-${selectedTab.id}` : undefined}
                    aria-live="polite"
                    tabIndex={0}
                >
                    {selectedTab ? parse(selectedTab.content) : <p>No language notes are available yet.</p>}
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

            <button className={`${styles.goTop} ${showTopButton ? styles.show : ""}`} type="button" onClick={scrollToPageTop} aria-label="Go to top" title="Go to top">↑</button>
        </div>
    );
};

export default DynamicTabs;
