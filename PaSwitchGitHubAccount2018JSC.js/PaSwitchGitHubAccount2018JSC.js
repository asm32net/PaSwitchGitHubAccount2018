// PaSwitchGitHubAccount2018JSC.js

import System;
import System.IO;
import System.Drawing;
import System.Windows.Forms;
import System.Text;
import System.Configuration;
import System.Security.Cryptography;
import Accessibility;

public class PaSwitchGitHubAccount2018JSC extends Form {
	var _this = this;

	class ButtonDef extends Button{
		var nIndex = 0;
		function ButtonDef(n){ nIndex = n; }
		protected override function OnClick(e : EventArgs){
			btnCommands_Click(nIndex);
		}
	}

	var nCommandCount = 6;
	var nConfigCount = 3;

	var configJson,
		configJsonCount;
	var strHttpProxy = "";

	// var jss = new JavaScriptSerializer();

	var tlp = new TableLayoutPanel();
	// var as1 = ((AnchorStyles)((((AnchorStyles.Top | AnchorStyles.Bottom) | AnchorStyles.Left) | AnchorStyles.Right)));
	var btnCommands = new ButtonDef[nCommandCount];
	var A_strGitConfigFiles = [".gitconfig", ".git-credentials"];
	var A_strButtonTexts = ["asm32cn@github.com", "asm32cn@github.com", "asm32cn@github.com",
			"asm32cn@github.com", "asm32cn@github.com", "asm32cn@github.com"];

	var strFolderUserProfile = Environment.GetEnvironmentVariable("USERPROFILE") + Path.DirectorySeparatorChar;

	protected override function get_DefaultSize(){
		return new System.Drawing.Size(300, 360);
	}

	function PaSwitchGitHubAccount2018JSC(){
		_this.set_Text("PaSwitchGitHubAccount2018JSC.js");
		_this.StartPosition = FormStartPosition.CenterScreen;
		_this.set_MinimumSize(new System.Drawing.Size(300, 360));


		try{
			var configData = AESDecrypt( ConfigurationManager.AppSettings["configData"] );
			strHttpProxy = ConfigurationManager.AppSettings["configHttpProxy"] || "";
			// Console.WriteLine(configData);
			// Console.WriteLine(strHttpProxy);

			configJson = eval(configData);
			configJsonCount = configJson.length;
			if(configJsonCount == nConfigCount){
				A_strButtonTexts[0] = configJson[0].strUserTitle;
				A_strButtonTexts[1] = configJson[1].strUserTitle;
				A_strButtonTexts[2] = configJson[2].strUserTitle;
				A_strButtonTexts[3] = configJson[0].strFolder;
				A_strButtonTexts[4] = configJson[1].strFolder;
				A_strButtonTexts[5] = configJson[2].strFolder;
			}

		}catch(ex){
			MessageBox.Show("Exception: " + ex.message);
		}

		initUI();

	}

	function initUI(){
		var as1 = 15;

		_this.tlp.SuspendLayout();
		_this.SuspendLayout();

		_this.tlp.Anchor = as1;
		_this.tlp.ColumnCount = 1;
		_this.tlp.RowCount = 6;
		_this.tlp.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100.0));

		for(var i = 0; i < nCommandCount; i++){
			_this.tlp.RowStyles.Add(new RowStyle(SizeType.Percent, 16.6));
		}
		for(var i = 0; i < nCommandCount; i++){
			btnCommands[i] = new ButtonDef(i);

			btnCommands[i].Anchor = as1;
			btnCommands[i].Dock = DockStyle.Fill;
			btnCommands[i].BackColor = Color.FromArgb(204, 204, 204);

			btnCommands[i].Text = A_strButtonTexts[i];

			_this.tlp.Controls.Add(btnCommands[i], 0, i);
		}
		_this.Controls.Add(_this.tlp);
		_this.Padding = new System.Windows.Forms.Padding(10);
		_this.tlp.ResumeLayout(false);
		_this.tlp.PerformLayout();
		_this.ResumeLayout(false);
		_this.tlp.Dock = DockStyle.Fill;
	}

	function btnCommands_Click(n){
		switch(n){
		case 0:
			PA_WriteGitConfig(0); break;
		case 1:
			PA_WriteGitConfig(1); break;
		case 2:
			PA_WriteGitConfig(2); break;

		case 3:
			PA_ExplorerFolder(0); break;
		case 4:
			PA_ExplorerFolder(1); break;
		case 5:
			PA_ExplorerFolder(2); break;
		default:
			// MessageBox.Show("click" + n);
			break;
		}
	}

	function PA_WriteTextFile(strFile, strContent){
		try{
			var sw = new StreamWriter(strFile);
			sw.Write(strContent);
			// sw.Flash();
			sw.Close();
		}catch(ex){
			MessageBox.Show("Exception: " + ex.message);
		}
	}

	function PA_WriteGitConfig(n){
		if(configJsonCount >= nConfigCount){
			var strContent = String.Format(
				"[user]\n\tname = {0}\n\temail = {1}\n[credential]\n\thelper = store\n",
				configJson[n].strUserName, configJson[n].strUserEmail
			);
			if(n < 2 && !String.IsNullOrEmpty(strHttpProxy)){
				strContent += "[http]\n\tproxy = " + strHttpProxy + "\n";
			}
			PA_WriteTextFile(strFolderUserProfile + A_strGitConfigFiles[0], strContent);

			strContent = configJson[n].strUserCredential + "\n";
			for(var i = 0; i < configJsonCount; i++){
				if(i != n){
					strContent += configJson[i].strUserCredential + "\n";
				}
			}
			PA_WriteTextFile(strFolderUserProfile + A_strGitConfigFiles[1], strContent);

		}
	}

	function PA_ExplorerFolder(n){
		if(nCommandCount >= nConfigCount){
			try{
				System.Diagnostics.Process.Start(configJson[n].strFolder);
			}catch(ex){
				MessageBox.Show("Exception: " + ex.message);
			}
		}else{
			MessageBox.Show("no config data");
		}
	}

	var  _key1 = [ 0xc4, 0xfe, 0xbe, 0xb2, 0xd6, 0xc2, 0xd4, 0xb6, 0xb5, 0xad, 0xb2, 0xb4, 0xc3, 0xf7, 0xd6, 0xbe ]; // 宁静致远淡泊明志
	var keys = "1a2s3d4f5g6h7j8k";//密钥,128位  
	function AESEncrypt(plainText){
		var des = Rijndael.Create();
		var inputByteArray = Encoding.UTF8.GetBytes(plainText);
		des.Key = Encoding.UTF8.GetBytes(keys);
		des.IV = _key1;

		var cTransform = des.CreateEncryptor();
		return Convert.ToBase64String( cTransform.TransformFinalBlock(inputByteArray, 0, inputByteArray.length) );
	}

	function AESDecrypt(cipherText){
		var des = Rijndael.Create();
		des.Key = Encoding.UTF8.GetBytes(keys);
		des.IV = _key1;

		var cTransform = des.CreateDecryptor();
		var data = Convert.FromBase64String(cipherText);
		return System.Text.Encoding.UTF8.GetString( cTransform.TransformFinalBlock(data, 0, data.length) );
	}


};

// MessageBox.Show("PaSwitchGitHubAccount2018JSC.js");
Application.Run(new PaSwitchGitHubAccount2018JSC());
