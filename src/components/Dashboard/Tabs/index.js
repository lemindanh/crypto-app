import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createTheme, ThemeProvider } from "@mui/material";
import Grid from "../Grid";
import "./styles.css"
import List from "../List";

function TabsComponent({ coins }) {
    const [value, setValue] = useState("grid");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const style = {
        color: "var(--white)",
        Width: "50vw",
        fontSize: "1.2rem",
        fontFamily: "Inter",
        fontWeight: 600,
        textTransform: "capitalize",
    };

    const theme = createTheme({
        Palette: {
            primary: {
                main: "#3a80e9",
            },
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <TabContext value={value}>
                <TabList onChange={handleChange} variant="fullWidth">
                    <Tab label="grid" value="grid" sx={style} />
                    <Tab label="list" value="list" sx={style} />
                </TabList>

                <TabPanel value="grid">
                    <div className="grid-flex">
                        {coins.map((coin, i) => {
                            return <Grid coin={coin} key={i}/>;
                        })}
                    </div>
                </TabPanel>
                <TabPanel value="list">
                    <table className="list-table">
                        {coins.map((coin, i) => {
                            return <List coin={coin} key={i}/>;
                        })}
                    </table>
                </TabPanel>
            </TabContext>
        </ThemeProvider>
    )
}

export default TabsComponent