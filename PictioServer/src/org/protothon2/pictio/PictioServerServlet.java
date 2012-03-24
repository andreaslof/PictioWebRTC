package org.protothon2.pictio;
import java.io.FileReader;
import java.io.IOException;
import java.io.Writer;
import java.nio.CharBuffer;

import javax.servlet.ServletException;
import javax.servlet.http.*;

import org.mortbay.log.Log;

import com.google.appengine.api.channel.ChannelMessage;
import com.google.appengine.api.channel.ChannelService;
import com.google.appengine.api.channel.ChannelServiceFactory;
import com.google.appengine.repackaged.org.json.JSONObject;
import com.google.appengine.tools.admin.ConfirmationCallback.Response;

@SuppressWarnings("serial")
public class PictioServerServlet extends HttpServlet {

	private String index = null;
	
	@Override
	public void init() throws ServletException {	
		super.init();
		try {
			FileReader reader = new FileReader("index-template");
		    CharBuffer buffer = CharBuffer.allocate(16384);
		    reader.read(buffer);
		    index = new String(buffer.array());
		} catch ( Exception e) {
			log("Exception in init(): " + e.getLocalizedMessage());
		}
	}
	
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException{
		try {
		resp.setContentType("application/json");
	    Writer  w = resp.getWriter();
	    JSONObject jsonObject = new JSONObject();
	    
		
	    String user = req.getParameter("user");
	    String game = req.getParameter("game");
	    String c = req.getParameter("c");	// command
	    String m = req.getParameter("m");	// message
	    ChannelService channelService = ChannelServiceFactory.getChannelService();
    	jsonObject.put("user", user);
    	jsonObject.put("game", game);

	    if ( "start".equals(c)) {
		    String token = channelService.createChannel(getChannelKey(user, game));
	    	jsonObject.put("status", "ok");
	    	jsonObject.put("token", token);
	    } else if ("message".equals(c)) {
	    	String channelKey = getChannelKey(user, game);
	    	jsonObject.put("message", m);
	    	jsonObject.put("status", "ok");
	    	ChannelMessage message = new ChannelMessage(channelKey, jsonObject.toString() );
	        channelService.sendMessage(message);
	    }
	    w.write(jsonObject.toString());
		} catch ( Exception e ) {
			log("Error", e);
		}
	}
	
	private String getChannelKey( String user, String game) {
		return "channel-"+game;
	}
}
