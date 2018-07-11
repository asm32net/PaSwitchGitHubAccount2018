// PaSwitchGitHubAccount2018JFrame.java
import java.io.*;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.*;
import javax.swing.JFrame;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.NodeList;

import javax.swing.JOptionPane;

class PaSwitchGitHubAccount2018JFrame extends JFrame implements ActionListener{
	// private GridBagLayout gbl = new GridBagLayout();
	private final String strWindowTitle = "PaSwitchGitHubAccount2018JFrame.java";
	private final int nCount = 6;
	private GridBagConstraints gbc = new GridBagConstraints();
	private String[] buttonsText = {"account1@github.com", "account2@github.com", "account3@github.com",
		"E:\\git-folder\\git-account1", "E:\\git-folder\\git-account2", "E:\\git-folder\\git-account3"};
	private String[] gitUserFiles = {".gitconfig", ".git-credentials"};
	private Button[] buttons = new Button[nCount];

	private static final String strConfigFile = "PaSwitchGitHubAccount2018JFrame.config.xml";
	private static final String strFolderUserProfile = System.getenv().get("USERPROFILE") + File.separator;

	private static DocumentBuilderFactory dbFactory = null;
	private static DocumentBuilder db = null;
	private Document document = null;
	private NodeList accountList = null;
	private NamedNodeMap[] namedNodeMap = null;
	private int nConfigCount = 0;
	static{
		try{
			dbFactory = DocumentBuilderFactory.newInstance();
			db = dbFactory.newDocumentBuilder();
		}catch(Exception ex){
			ex.printStackTrace();
		}
	}

	public PaSwitchGitHubAccount2018JFrame(){
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		this.setTitle(strWindowTitle);
		this.setSize(300, 360);
		this.setLocationRelativeTo(null);
		this.setMinimumSize(new Dimension(300, 360));

		initUI();

		this.setVisible(true);
	}

	private String getAttribute(NamedNodeMap nnp, String strKey){
		String sValue = null;
		if(nnp != null){
			org.w3c.dom.Node node = nnp.getNamedItem(strKey);
			if(node != null){
				sValue = node.getTextContent();
			}
		}
		return sValue;
	}

	public void initUI(){
		gbc.fill = GridBagConstraints.BOTH;
		setLayout(new GridBagLayout());

		gbc.insets = new Insets(5, 5, 5, 5);
		gbc.weightx = 10;
		gbc.weighty = 10;
		gbc.gridx = 0;
		// gbc.gridy = 0;
		gbc.gridwidth = 1;
		gbc.gridheight = 1;

		Color btnBackColor = new Color(204, 204, 204);

		try{
			document = db.parse(strConfigFile);
			accountList = document.getElementsByTagName("account");
			nConfigCount = accountList.getLength();

			// log("nConfigCount = " + nConfigCount);
			if(nConfigCount == 3){
				namedNodeMap = new NamedNodeMap[nConfigCount];
				for(int i = 0; i < nConfigCount; i++){
					// org.w3c.dom.Node node = accountList.item(i);
					namedNodeMap[i] = accountList.item(i).getAttributes();
					// log( getAttribute(namedNodeMap[i], "strUserFolder") );

					buttonsText[i] = getAttribute(namedNodeMap[i], "strUserTitle");
					buttonsText[i + 3] = getAttribute(namedNodeMap[i], "strUserFolder");
				}
			}

		}catch(Exception ex){
			log("exception: " + ex.getMessage());
		}

		for(int i = 0; i < nCount; i++){
			buttons[i] = new Button( buttonsText[i] );
			buttons[i].setBackground(btnBackColor);
			gbc.gridy = i;
			add(buttons[i], gbc);

			buttons[i].addActionListener(this);
		}
	}

	@Override
	public void actionPerformed(ActionEvent ev){
		int nSelected = -1;
		Object evo = ev.getSource();
		for(int i = 0; i < nCount; i++){
			if(evo.equals(buttons[i])){
				nSelected = i;
				break;
			}
		}

		if(nConfigCount < 3){
			messageBox("nConfigCount = " + nConfigCount + " ( < 3 )");
			return;
		}
		try {
			String strFolder = null;

			// log("nSelected = " + nSelected);

			if(nSelected >= 0 && nSelected < 3){

				// strFolder = System.getenv().get("USERPROFILE") + File.separator;
				strFolder = strFolderUserProfile;
				// log("strFolder = " + strFolder);

				String strContent = java.text.MessageFormat.format(
					"[user]\n\tname = {0}\n\temail = {1}\n[credential]\n\thelper = store\n",
					getAttribute(namedNodeMap[nSelected], "strUserName"),
					getAttribute(namedNodeMap[nSelected], "strUserEmail")
				);

				if( ! writeTextFile(strFolderUserProfile + gitUserFiles[0], strContent) ){
					messageBox("Write " + gitUserFiles[0] + " fail.");
				}

				strContent = getAttribute(namedNodeMap[nSelected], "strUserCredential") + "\n";
				for(int i = 0; i < nConfigCount; i++){
					if(i != nSelected){
						strContent += getAttribute(namedNodeMap[i], "strUserCredential") + "\n";
					}
				}
				if( ! writeTextFile(strFolderUserProfile + gitUserFiles[1], strContent) ){
					messageBox("Write " + gitUserFiles[1] + " fail.");
				}

				// log("strContent = " + strContent);

			}else if(nSelected <= 6){
				// try {
				// 	String strCommand = "start E:\\git-folder\\git-asm32cn";
				// 	Process process = Runtime.getRuntime().exec(strCommand);  
				// 	int exitValue = process.waitFor();  
				// 	if (0 != exitValue) {  
				// 		log("call shell failed. error code is :" + exitValue);  
				// 	}  
				// } catch (Throwable ex) {  
				// 	log("call shell failed. " + ex);  
				// } 

				strFolder = getAttribute(namedNodeMap[nSelected - 3], "strUserFolder");
				java.awt.Desktop.getDesktop().open(new File( strFolder ));

			}
		} catch (Exception e) {
			messageBox("Exception: " + e.getMessage());
		}
	}

	private void messageBox(String s){
		JOptionPane.showMessageDialog(this, s, strWindowTitle, JOptionPane.INFORMATION_MESSAGE);
	}

	private void log(String s){
		System.out.println(s);
	}

	private boolean writeTextFile(String strFile, String strContent){
		File file = new File(strFile);
		try(FileOutputStream fop = new FileOutputStream(file)){
			if(!file.exists()){ file.createNewFile(); }
			if(strContent != null){
				fop.write( strContent.getBytes() );
			}
			fop.flush();
			fop.close();
		}catch(IOException ex){
			return false;
		}
		return true;
	}

	public static void main(String[] args){
		PaSwitchGitHubAccount2018JFrame frame = new PaSwitchGitHubAccount2018JFrame();

		System.out.println("PaSwitchGitHubAccount2018JFrame.java");
	}
}