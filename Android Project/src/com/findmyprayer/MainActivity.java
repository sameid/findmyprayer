package com.findmyprayer;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

public class MainActivity extends Activity {
	
	Button searchButton;
	GPSTracker gps;


	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		searchButton = (Button) findViewById(R.id.search_button);
		
		searchButton.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				Intent myIntent = new Intent(MainActivity.this, MapActivity.class);

				//TODO check if gps is on and use gps.showSettingsAlert() if it isn't
				//Assume gps is on
				gps = new GPSTracker(getBaseContext());
				if(gps.canGetLocation()){
					myIntent.putExtra("latitude", gps.getLatitude());
					myIntent.putExtra("longitude", gps.getLongitude());
					gps.stopUsingGPS();
				}
				MainActivity.this.startActivity(myIntent);			}
		});
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

}
