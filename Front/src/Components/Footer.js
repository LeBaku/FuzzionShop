import React from 'react';
import { Typography, Link, useTheme, useMediaQuery } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import '../css/Footer.css';

function Footer() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div className="footer-container">
            <div className="middle-container">
                <div className="info-container">
                    {!isMobile && (
                        <>
                            <PhoneIcon className="icon" />
                            <Typography variant="body2" className="text">
                                <Link href="tel:0648240892" className="link">
                                    06 48 24 08 92
                                </Link>
                            </Typography>
                        </>
                    )}
                    {isMobile && (
                        <>
                            <Link href="tel:0648240892">
                                <PhoneIcon className="icon" />
                            </Link>
                        </>
                    )}
                </div>
                <div className="info-container">
                    {!isMobile && (
                        <>
                            <MailOutlineIcon className="icon" />
                            <Typography variant="body2" className="text">
                                <Link href="mailto:fuzzion.shoppro@gmail.com" className="link">
                                    fuzzion.shoppro@gmail.com
                                </Link>
                            </Typography>
                        </>
                    )}
                    {isMobile && (
                        <>
                            <Link href="mailto:fuzzion.shoppro@gmail.com">
                                <MailOutlineIcon className="icon" />
                            </Link>
                        </>
                    )}
                </div>
                <div className="info-container">
                    {!isMobile && (
                        <>
                            <FmdGoodIcon className="icon" />
                            <Typography variant="body2" className="text">
                                <Link href="https://maps.google.com/?q=31+Rue+des+4+Églises+54000+Nancy" target="_blank" rel="noopener noreferrer" className="link">
                                    31 Rue des 4 Églises
                                    <br />
                                    54000 Nancy
                                </Link>
                            </Typography>
                        </>
                    )}
                    {isMobile && (
                        <>
                            <Link href="https://maps.google.com/?q=31+Rue+des+4+Églises+54000+Nancy" target="_blank" rel="noopener noreferrer" className="link">
                                <FmdGoodIcon className="icon" />
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Footer;
