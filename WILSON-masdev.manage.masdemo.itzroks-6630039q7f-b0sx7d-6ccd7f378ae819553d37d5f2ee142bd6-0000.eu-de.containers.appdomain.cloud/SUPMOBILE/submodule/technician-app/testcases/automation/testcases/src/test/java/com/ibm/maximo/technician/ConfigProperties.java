package com.ibm.maximo.technician;

import java.io.FileInputStream;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.util.Enumeration;
import java.util.List;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ibm.maximo.automation.mobile.MobileAutomationFramework;
import com.ibm.maximo.automation.mobile.stub.MaximoStubConfiguration;

import io.appium.java_client.AppiumDriver;

public class ConfigProperties {

    private static Properties props;
    private String maximoUrl;
    private MaximoStubConfiguration msc;
    private AppiumDriver<?> driver;
    
    private static final Logger logger = LoggerFactory.getLogger(ConfigProperties.class);

    public ConfigProperties() {
        props = new Properties();
        try {
            if (System.getProperty("configFile") != null)
                props.load(new FileInputStream(System.getProperty("configFile")));

            setConfigurationValue("appiumServerUrl", TestProperties.APPIUM_URL);
            setConfigurationValue("deviceType", "android");
            setConfigurationValue("testType", "mobileapp");
            setConfigurationValue("gsaRootFolder", TestProperties.GSA_ROOT_FOLDER);
            setConfigurationValue("packagePath", TestProperties.PACKAGE_PATH);
            setConfigurationValue("PACKAGE_NAME", TestProperties.PACKAGE_NAME);
//            setConfigurationValue("pin", TestProperties.DEVICE_PIN);
            // testType can be mobilebrowser, mobileapp, desktop
            
//            setConfigurationValue("maximoUrl", "http://iotvmdb031.fyre.ibm.com:7003/maximo");
//            setConfigurationValue("maximoUrl", "http://9.46.75.209:7003/maximo");
            
//            setConfigurationValue("maximoUrl", "https://kayaking1.fyre.ibm.com:9443/maximo");
//            setConfigurationValue("maximoUrl", "https://9.46.65.191:9443/maximo");
            
//            setConfigurationValue("maximoUrl", "http://widowed.fyre.ibm.com:9080/maximo");
           // setConfigurationValue("maximoUrl", "http://10.0.2.2:7001/maximo");
            //setConfigurationValue("maximoUrl", "http://192.168.1.7:7001/maximo");
            
            setConfigurationValue("maximoUrl", TestProperties.MAXIMO_URL);
                       
            setConfigurationValue("useMaximoStub", "false");
            setConfigurationValue("maximoStubUrl", "http://" + getLocalIbmVpnInterface() + ":8080/maximo");
            
//            setConfigurationValue("alwaysDownloadFromGsa", "false");
            
            setConfigurationValue("showConsoleLogs", "true");
            
            logger.info("--- Starting Test ---");
            logger.info("       Device Type: {}", props.getProperty("deviceType"));
            logger.info("         Test Type: {}", props.getProperty("testType"));
            logger.info(" Appium Server Url: {}", props.getProperty("appiumServerUrl"));
            logger.info("        Maximo Url: {}", props.getProperty("maximoUrl"));
            logger.info("  Use Maximo Stub?: {}", props.getProperty("useMaximoStub"));
            
            if(Boolean.valueOf(props.getProperty("useMaximoStub")))
                logger.info("   Maximo Stub Url: {}", props.getProperty("maximoStubUrl"));
            
            driver = MobileAutomationFramework.getConfiguredMobileDriver(props);
            
            if(props.getProperty("testType").equalsIgnoreCase("mobilebrowser")) {
            	driver.get("http://192.168.15.11:3000");
            }
            
            if(Boolean.valueOf(props.getProperty("showConsoleLogs")))
                driver.executeScript("window.onerror=console.error.bind(console)");

        } catch (Exception e) {
            e.printStackTrace();
            System.exit(1);
        }
    }

    public void configureStub(List<Enum<?>> endpoints) {
        if(props.containsKey("useMaximoStub") && Boolean.valueOf(props.getProperty("useMaximoStub"))) {
            maximoUrl = props.getProperty("maximoStubUrl");

            if(msc == null)
                msc = new MaximoStubConfiguration(maximoUrl);

            msc.addEndpoints(endpoints)
            .persistConfig();
        } else {
            maximoUrl = props.getProperty("maximoUrl");
        }

    }

    public String getMaximoUrl() {
        return maximoUrl;
    }
    
    public String getProperty(String propName) {
        return props.getProperty(propName);
    }

    private static void setConfigurationValue(String property, String defaultValue) {
        if (System.getProperty(property) != null)
            props.setProperty(property, System.getProperty(property));
        else if (props.getProperty(property) == null && defaultValue != null)
            props.setProperty(property, defaultValue);
    }

    public AppiumDriver<?> getDriver() {
        return driver;
    }
    
    public String getLocalIbmVpnInterface() throws Exception {
        Enumeration<NetworkInterface> e = NetworkInterface.getNetworkInterfaces();
        while(e.hasMoreElements()) {
            NetworkInterface n = e.nextElement();
            Enumeration<InetAddress> ee = n.getInetAddresses();
            while (ee.hasMoreElements()) {
                InetAddress i = ee.nextElement();
                if(i.getHostAddress().startsWith("9."))
                    return i.getHostAddress();
            }
        }
        
        return null;
    }

}
