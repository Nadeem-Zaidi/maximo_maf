package com.ibm.maximo.technician.listener;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.testng.ITestResult;
import org.testng.Reporter;
import org.testng.TestListenerAdapter;

import com.ibm.maximo.automation.mobile.FrameworkFactory;

public class ScreenShotListener extends TestListenerAdapter {
	
	@Override
    public void onTestFailure(ITestResult result) {
		Calendar calendar = Calendar.getInstance();
        SimpleDateFormat formater = new SimpleDateFormat("dd_MM_yyyy_hh_mm_ss");
        String methodName = result.getName();
        if(!result.isSuccess()){
        	try {
        		String reportDirectory = new File(System.getProperty("user.dir")).getAbsolutePath() + "/test-output/failure_screenshots";
        		String savedImgPath = reportDirectory+"/"+methodName+"_"+formater.format(calendar.getTime())+".png";
        		FrameworkFactory.get().saveScreenShot(savedImgPath);
                Reporter.log("<a href='"+ savedImgPath + "'> <img src='"+ savedImgPath + "' height='200' width='200'/> </a>");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

}
