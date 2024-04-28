import React, { useState } from 'react'
import styles from "./styles.module.scss";
import tabsContent from "./tabs-content.json";
import parse from 'html-react-parser';

const DynamicTabs = () => {
    const [tabId, setTabId] = useState(0);
    const [tabContent, setTabContent] = useState("");

    const handleTabClick = (id) => {
        // console.log(id, "tabId");
        setTabId(id);
        const value = tabsContent.filter(obj => {
            return obj.id === id;
        })
        // console.log(value, value[0].content, "content");
        setTabContent(value[0].content);
    };

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.heading}>Dynamic Tabs: types of programming language</div>

                <div className={styles.tabHeaderContainer}>
                    {tabsContent.map(item => (
                        <div
                            key={item.id}
                            onClick={() => handleTabClick(item.id)}
                            className={styles.tab}
                            style={tabId === item.id
                                ? { backgroundColor: "#00f" }
                                : { backgroundColor: "#000" }}
                        >{item.tab}</div>
                    ))}
                </div>

                <div className={styles.tabContentContainer}>
                    {parse(tabContent)}
                    {/* {tabContent} */}
                </div>
            </div>
        </div>
    )
}

export default DynamicTabs

