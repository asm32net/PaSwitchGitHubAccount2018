// PaSwitchGitHubAccount2018JSC.js

import System;
import System.IO;
import System.Drawing;
import System.Windows.Forms;
import System.Text;
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

	var tlp = new TableLayoutPanel();
	// var as1 = ((AnchorStyles)((((AnchorStyles.Top | AnchorStyles.Bottom) | AnchorStyles.Left) | AnchorStyles.Right)));
	var btnCommands = new ButtonDef[nCommandCount];
	var A_strButtonsText = ["asm32cn@github.com", "asm32cn@github.com", "asm32cn@github.com",
			"asm32cn@github.com", "asm32cn@github.com", "asm32cn@github.com"];

	var strFolderUserProfile = Environment.GetEnvironmentVariable("USERPROFILE") + Path.DirectorySeparatorChar;

	protected override function get_DefaultSize(){
		return new System.Drawing.Size(300, 360);
	}

	function PaSwitchGitHubAccount2018JSC(){
		_this.set_Text("PaSwitchGitHubAccount2018JSC.js");
		_this.StartPosition = FormStartPosition.CenterScreen;
		_this.set_MinimumSize(new System.Drawing.Size(300, 360));

		initUI();

		Console.WriteLine( AESEncrypt("aaa..") );
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

			// btnCommands[i].nIndex = i;

			btnCommands[i].Anchor = as1;
			// btnCommands[i].Anchor = as1;
			btnCommands[i].Dock = DockStyle.Fill;
			btnCommands[i].BackColor = Color.FromArgb(204, 204, 204);

			btnCommands[i].Text = A_strButtonsText[i];

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
		case 3:
			PA_ExplorerFolder(0); break;
		case 4:
			PA_ExplorerFolder(1); break;
		case 5:
			PA_ExplorerFolder(2); break;
		default:
			MessageBox.Show("click" + n);
			break;
		}
	}

	function PA_ExplorerFolder(n){
		if(nCommandCount >= nConfigCount){
			System.Diagnostics.Process.Start(strFolderUserProfile);
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
