using System;
using System.IO;
using System.Drawing;
using System.Resources;

public class _CreateResource{
	public static void Main(string[] args){
		string strCrlf = "\r\n";
		string strOutputFile = null;
		bool isReady = false;
		try{
			string m_strFile_xml = "_CreateResource.xml";
			System.Xml.XmlTextReader xtr = new System.Xml.XmlTextReader(m_strFile_xml);
			//xtr.ReadToFollowing ("item");//.net2.0+
			while(xtr.Read()){
				if(xtr.Name.Equals("strOutputFile")){
					strOutputFile = xtr.GetAttribute("strFile");
					isReady = true;
					break;
				}
			}
			if(isReady){
				ResourceWriter rw = new ResourceWriter(strOutputFile);
				Console.Write("Output: " + strOutputFile + strCrlf);

				while(xtr.Read()){
					string strTypeName = xtr.Name;
					string strItemName = "key";
					string strResource = "value";
					if(strTypeName.Equals("Icon")){
						Icon ico = new Icon(strItemName = xtr.GetAttribute("strFile"));
						rw.AddResource(strResource = xtr.GetAttribute("strResourceName"), ico);
						Console.Write(strTypeName + ": \"" + strItemName + "\" => \"" + strResource + "\"" + strCrlf);
					}else if(strTypeName.Equals("Image")){
						Image img = Image.FromFile(strItemName = xtr.GetAttribute("strFile"));
						rw.AddResource(strResource = xtr.GetAttribute("strResourceName"), img);
						Console.Write(strTypeName + ": \"" + strItemName + "\" => \"" + strResource + "\"" + strCrlf);
					}else if(strTypeName.Equals("Data")){
						FileStream fs = new FileStream(strItemName = xtr.GetAttribute("strFile"),
							FileMode.Open, FileAccess.Read, FileShare.Read);
						int nFileLength = (int)fs.Length;
						BinaryReader br = new BinaryReader(fs);
						byte[] byteBuffer = br.ReadBytes(nFileLength);
						if(byteBuffer.Length==nFileLength){
							rw.AddResource(strResource = xtr.GetAttribute("strResourceName"), byteBuffer);
						}else{
							Console.Write("Read fail." + strCrlf);
						}
						br.Close();
						fs.Close();
						Console.Write(strTypeName + ": \"" + strItemName + "\" => \"" + strResource + "\"" + strCrlf);
					}else if(strTypeName.Equals("String")){
						string strContent = xtr.GetAttribute("strContent");
						rw.AddResource(strResource = xtr.GetAttribute("strResourceName"),
							strContent);
						Console.Write(strTypeName + ": \"" + strContent + "\" => \"" + strResource + "\"" + strCrlf);
					}
				}
				Console.Write("-------------------------" + strCrlf + "Update to resource file." + strCrlf);
				rw.Generate();
				rw.Close();
			}
			xtr.Close();


		}catch(Exception ex){
			Console.Write("Exception: " + ex.Message + strCrlf);
			Console.Write("ExceptionStack:" + strCrlf + ex.StackTrace + strCrlf);
		}

	}
}