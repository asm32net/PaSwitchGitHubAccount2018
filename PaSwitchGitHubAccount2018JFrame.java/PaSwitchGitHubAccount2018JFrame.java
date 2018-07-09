// PaSwitchGitHubAccount2018JFrame.java
import java.io.*;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.*;
import javax.swing.JFrame;

import javax.swing.JOptionPane;

class PaSwitchGitHubAccount2018JFrame extends JFrame implements ActionListener{
	// private GridBagLayout gbl = new GridBagLayout();
	private final String strWindowTitle = "PaSwitchGitHubAccount2018JFrame.java";
	private final int nCount = 6;
	private GridBagConstraints gbc = new GridBagConstraints();
	private String[] buttonsText = {"account1@github.com", "account2@github.com", "account3@github.com",
		"E:\\git-folder\\git-account1", "E:\\git-folder\\git-account2", "E:\\git-folder\\git-account3"};
	private Button[] buttons = new Button[nCount];

	public PaSwitchGitHubAccount2018JFrame(){
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		this.setTitle(strWindowTitle);
		this.setSize(300, 360);
		this.setLocationRelativeTo(null);
		this.setMinimumSize(new Dimension(300, 360));

		initUI();

		this.setVisible(true);
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
		if(nSelected >= 3 && nSelected <= 6){
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

			try {
				java.awt.Desktop.getDesktop().open(new File( buttonsText[nSelected] ));
			} catch (Exception e) {
				MessageBox(e.getMessage());
			}

		}
	}

	private void MessageBox(String s){
		JOptionPane.showMessageDialog(this, s, strWindowTitle, JOptionPane.INFORMATION_MESSAGE);
	}

	private void log(String s){
		System.out.println(s);
	}

	public static void main(String[] args){
		PaSwitchGitHubAccount2018JFrame frame = new PaSwitchGitHubAccount2018JFrame();

		System.out.println("PaSwitchGitHubAccount2018JFrame.java");
	}
}