package com.findmyprayer;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.widget.Toast;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;



public class MapActivity extends Activity {
	
	  private GoogleMap map;
	  LatLng currentPos;

	@SuppressLint("NewApi")
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_map);
		
		Intent i = getIntent();
		
		if (i.getExtras() != null) {
			
			LatLng currentPos = new LatLng(i.getDoubleExtra("latitude", 0.00),
					i.getDoubleExtra("longitude",0.00));
		    map = ((MapFragment) getFragmentManager().findFragmentById(R.id.map))
		            .getMap();
		        Marker me = map.addMarker(new MarkerOptions().position(currentPos)
		            .title("Me"));

		        // Move the camera instantly to hamburg with a zoom of 15.
		        map.moveCamera(CameraUpdateFactory.newLatLngZoom(currentPos, 15));

		        // Zoom in, animating the camera.
		        map.animateCamera(CameraUpdateFactory.zoomTo(10), 2000, null);
		}
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.map, menu);
		return true;
	}

}
