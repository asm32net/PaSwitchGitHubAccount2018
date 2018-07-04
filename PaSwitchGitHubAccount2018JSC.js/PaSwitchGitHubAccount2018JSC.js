// PaSwitchGitHubAccount2018JSC.js

import System;
import System.Drawing;
import System.Windows.Forms;
import Accessibility;

public class PaSwitchGitHubAccount2018JSC extends Form {
	var _this = this;
	var nCommandCount = 6;

	var tlp = new TableLayoutPanel();
	// var as1 = ((AnchorStyles)((((AnchorStyles.Top | AnchorStyles.Bottom) | AnchorStyles.Left) | AnchorStyles.Right)));
	var btnCommands = new Button[nCommandCount];
	var A_strButtonsText = ["asm32cn@github.com", "asm32cn@github.com", "asm32cn@github.com", "asm32cn@github.com", "asm32cn@github.com", "asm32cn@github.com"];

	protected override function get_DefaultSize(){
		return new System.Drawing.Size(300, 360);
	}

	function PaSwitchGitHubAccount2018JSC(){
		_this.set_Text("PaSwitchGitHubAccount2018JSC.js");
		_this.StartPosition = FormStartPosition.CenterScreen;
		_this.set_MinimumSize(new System.Drawing.Size(300, 360));

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
			btnCommands[i] = new Button();
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
};

// MessageBox.Show("PaSwitchGitHubAccount2018JSC.js");
Application.Run(new PaSwitchGitHubAccount2018JSC());
