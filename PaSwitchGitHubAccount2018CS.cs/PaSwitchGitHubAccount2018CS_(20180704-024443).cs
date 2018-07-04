// PaSwitchGitHubAccount2018CS.cs

using System;
using System.IO;
using System.Drawing;
using System.Windows.Forms;
using System.Text;
using System.Security.Cryptography;
using System.Configuration;
using System.Web.Script.Serialization;

class PaSwitchGitHubAccount2018CS:Form{
	// private const string strConfigFile = "PaSwitchGitHubAccount2018CS.exe.config";
	// private Configuration config = ConfigurationManager.OpenExeConfiguration(strConfigFile);
	private JavaScriptSerializer jss = new JavaScriptSerializer();

	private GitHubAccountEntity[] configJson;
	private int configJsonCount = 0;

	private TableLayoutPanel tlp = new TableLayoutPanel();
	private AnchorStyles as1 = ((AnchorStyles)((((AnchorStyles.Top | AnchorStyles.Bottom) | AnchorStyles.Left) | AnchorStyles.Right)));
	private const int nCommandCount = 4;
	private Button[] btnCommand = new Button[nCommandCount];
	private string[] A_strGitConfigFiles = {".gitconfig", ".git-credentials"};

	private string strFolderUserProfile = Environment.GetEnvironmentVariable("USERPROFILE") + Path.DirectorySeparatorChar;

	protected override Size DefaultSize {
		get{ return new Size(300, 300); }
	}

	public string ReadTextFile(string strFile){
		string strContent = null;
		try{
			using(FileStream fs = new FileStream(strFile, FileMode.Open, FileAccess.Read, FileShare.ReadWrite)){
				using(StreamReader sr = new StreamReader(fs, System.Text.Encoding.UTF8)){
					strContent =  sr.ReadToEnd();
				}
			}
		}catch(Exception ex){
			MessageBox.Show("Exception: " + ex.Message);
		}
		return strContent;
	}

	public PaSwitchGitHubAccount2018CS(){
		this.Text = "PaSwitchGitHubAccount2018CS.cs";
		this.StartPosition = FormStartPosition.CenterScreen;
		// this.MinimumSize = new Size(400, 450);

		// Console.WriteLine( "USERPROFILE = " + strFolderUserProfile );

		// string strGitConfig = ReadTextFile(strFolderUserProfile + A_strGitConfigFiles[0]);
		// string strEncrypt = AESEncrypt( strGitConfig );
		
		// // Console.WriteLine(strGitConfig);
		// Console.WriteLine( strEncrypt );

		// strGitConfig = ReadTextFile(strFolderUserProfile + A_strGitConfigFiles[0]);
		// strEncrypt = AESEncrypt( strGitConfig );
		// Console.WriteLine( strEncrypt );

		// strGitConfig = ReadTextFile("PaSwitchGitHubAccount2018CS.json");
		// strEncrypt = AESEncrypt( strGitConfig );
		// Console.WriteLine( strEncrypt );

		try{
			string configData = AESDecrypt( ConfigurationManager.AppSettings["configData"] );

			configJson = jss.Deserialize<GitHubAccountEntity[]>(configData);
			configJsonCount = configJson.Length;

			// Console.WriteLine( configJson.Length );
			// Console.WriteLine( configJson[0].strFolder );
			// Console.WriteLine( configJson[1].strFolder );

			// Console.WriteLine( configData );
		}catch(Exception ex){
			MessageBox.Show("Exception: " + ex.Message);
		}

		initUI();
	}

	public void initUI(){
		this.tlp.SuspendLayout();
		this.SuspendLayout();

		this.tlp.Anchor = as1;
		this.tlp.ColumnCount = 1;
		this.tlp.RowCount = 4;
		this.tlp.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100F));

		for(int i = 0; i < nCommandCount; i++){
			this.tlp.RowStyles.Add(new RowStyle(SizeType.Percent, 25F));
		}

		for(int i = 0; i < nCommandCount; i++){
			btnCommand[i] = new Button();
			btnCommand[i].Anchor = as1;
			btnCommand[i].Dock = DockStyle.Fill;
			btnCommand[i].BackColor = Color.FromArgb(204, 204, 204); // #ccc

			btnCommand[i].Text = "asm32cn@github.com";

			// btnCommand[i].Click += delegate(object sender, EventArgs e){};
			btnCommand[i].Click += new EventHandler(btnCommand_OnClick);

			this.tlp.Controls.Add(btnCommand[i], 0, i);
		}

		this.Controls.Add(this.tlp);
		this.Padding = new Padding(10);
		this.tlp.ResumeLayout(false);
		this.tlp.PerformLayout();
		this.ResumeLayout(false);
		this.tlp.Dock = DockStyle.Fill;

	}

	private void PA_WriteTextFile(string strFile, string strContent){
		try{
			StreamWriter sw = new StreamWriter(strFile);
			sw.Write(strContent);
			sw.Flush();
			sw.Close();
		}catch(Exception ex){
			MessageBox.Show("Exception: " + ex.Message);
		}
	}

	private void PA_WriteGitConfig(int n){
		if(configJsonCount >= 2){
			string strContent = string.Format(
				"[user]\n\tname = {0}\n\temail = {1}\n[credential]\n\thelper = store\n",
				configJson[n].strUserName, configJson[n].strUserEmail
			);
			PA_WriteTextFile(strFolderUserProfile + A_strGitConfigFiles[0], strContent);

			strContent = configJson[n].strUserCredential + "\n";
			for(int i = 0; i < configJsonCount; i++){
				if(i != n){
					strContent += configJson[i].strUserCredential + "\n";
				}
			}
			PA_WriteTextFile(strFolderUserProfile + A_strGitConfigFiles[1], strContent);

		}else{
			MessageBox.Show("no config data");
		}
	}

	private void PA_ExplorerFolder(int n){
		if(configJsonCount >= 2){
			System.Diagnostics.Process.Start(configJson[n].strFolder);
		}else{
			MessageBox.Show("no config data");
		}
	}

	private void btnCommand_OnClick(object sender, EventArgs e){
		Button btnSender = (Button)sender;
		int nCode = -1;
		for(int i = 0; i < nCommandCount; i++){
			if(btnSender == btnCommand[i]){
				nCode = i;
				break;
			}
		}
		switch(nCode){
		case 0:
			PA_WriteGitConfig(0);
			break;
		case 1:
			PA_WriteGitConfig(1);
			break;
		case 2:
			PA_ExplorerFolder(0);
			break;
		case 3:
			PA_ExplorerFolder(1);
			break;
		default:
			MessageBox.Show(nCode.ToString());
			break;
		}
	}

	public static byte[] _key1 = { 0xc4, 0xfe, 0xbe, 0xb2, 0xd6, 0xc2, 0xd4, 0xb6, 0xb5, 0xad, 0xb2, 0xb4, 0xc3, 0xf7, 0xd6, 0xbe }; // 宁静致远淡泊明志
	public static string keys = "1a2s3d4f5g6h7j8k";//密钥,128位  

	public string AESEncrypt(string plainText){
			SymmetricAlgorithm des = Rijndael.Create();
			byte[] inputByteArray = Encoding.UTF8.GetBytes(plainText);		
			des.Key = Encoding.UTF8.GetBytes(keys);
			des.IV = _key1;

			ICryptoTransform cTransform = des.CreateEncryptor();
			return Convert.ToBase64String( cTransform.TransformFinalBlock(inputByteArray, 0, inputByteArray.Length) );
	}

	public string AESDecrypt(string cipherText){
			SymmetricAlgorithm des = Rijndael.Create();
			des.Key = Encoding.UTF8.GetBytes(keys);
			des.IV = _key1;

			ICryptoTransform cTransform = des.CreateDecryptor();
			byte[] data = Convert.FromBase64String(cipherText);
			return System.Text.Encoding.UTF8.GetString( cTransform.TransformFinalBlock(data, 0, data.Length) );
	}


	public static void Main(string[] args){
		Application.Run(new PaSwitchGitHubAccount2018CS());
	}
}

class GitHubAccountEntity{
	public string strFolder;
	public string strUserName;
	public string strUserTitle;
	public string strUserEmail;
	public string strUserCredential;

	public GitHubAccountEntity(){}

	public GitHubAccountEntity(string strFolder, string strUserName,
			string strUserTitle, string strUserEmail, string strUserCredential){
		this.strFolder         = strFolder;
		this.strUserName       = strUserName;
		this.strUserTitle      = strUserTitle;
		this.strUserEmail      = strUserEmail;
		this.strUserCredential = strUserCredential;
	}
};
