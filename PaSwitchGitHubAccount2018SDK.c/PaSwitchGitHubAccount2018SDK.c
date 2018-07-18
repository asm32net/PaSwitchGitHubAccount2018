// PaSwitchGitHubAccount2018SDK.c
#include <windows.h>
#include <stdio.h>

#define ICON1 1

LRESULT CALLBACK WindowFunc(HWND,UINT,WPARAM,LPARAM);

char szWinName[] = "PaSwitchGitHubAccount2018SDK.c";
char* A_pszButtonsText[] = {"account1@github.com", "account2@github.com", "account3@github.com",
		"E:\\git-folder\\git-account1", "E:\\git-folder\\git-account2", "E:\\git-folder\\git-account3"};
HWND A_hwndButtons[6];
HINSTANCE ghThisInst;

int WINAPI WinMain(HINSTANCE hThisInst,HINSTANCE hPrevInst,
				   LPSTR lpszArgs,int nWinMode){
	HWND hwnd;
	MSG msg;
	WNDCLASS wc1;

	ghThisInst = hThisInst;

	//定义一个窗口类
	wc1.hInstance = hThisInst;        //改实例的句柄
	wc1.lpszClassName = szWinName;    //窗口类的名称
	wc1.lpfnWndProc = WindowFunc;     //窗口名称
	wc1.style = 0;                    //默认模式

	// wc1.hIcon = LoadIcon(NULL,IDI_APPLICATION);   //图标模式
	wc1.hIcon = LoadIcon(hThisInst, MAKEINTRESOURCE(ICON1));   //图标模式
	wc1.hCursor = LoadCursor(NULL,IDC_ARROW);     //光标模式
	wc1.lpszMenuName = NULL;                      //没有菜单

	wc1.cbClsExtra = 0;
	wc1.cbWndExtra = 0;

	//设置窗口背景为白色
	wc1.hbrBackground = (HBRUSH)GetStockObject(WHITE_BRUSH);

	//登记窗口类
	if(!RegisterClass(&wc1)) return 0;

	int m_nWindowW = 300, m_nWindowH = 360;
	int nStartPosX = (GetSystemMetrics(SM_CXSCREEN) - m_nWindowW) / 2;
	int nStartPosY = (GetSystemMetrics(SM_CYSCREEN) - m_nWindowH) / 2;

	//创建一个窗口
	hwnd=CreateWindow(
		szWinName,                  //窗口类名
		"Windows 98 Framework",     //标题
		WS_OVERLAPPEDWINDOW,        //窗口模式
		nStartPosX,                 // X 坐标CW_USEDEFAULT
		nStartPosY,                 // Y 坐标CW_USEDEFAULT
		m_nWindowW,                 //宽度CW_USEDEFAULT
		m_nWindowH,                 //高度CW_USEDEFAULT
		HWND_DESKTOP,               //没有父窗口
		NULL,                       //没有菜单
		hThisInst,                  //该程序实例的句柄
		NULL
		);

	//显示窗口
	ShowWindow(hwnd,nWinMode);
	UpdateWindow(hwnd);

	//创建消息循环
	while(GetMessage(&msg,NULL,0,0)){
		TranslateMessage(&msg);     //允许使用键盘
		DispatchMessage(&msg);      //返回窗口控制
	}
	return msg.wParam;
}

//该函数被 Windows 98 调用，可以从消息队列中传递消息
LRESULT CALLBACK WindowFunc(HWND hwnd, UINT message,
							WPARAM wParam, LPARAM lParam){
	RECT rect;
	int m_nWidth, m_nHeight;
	switch(message){
	case WM_DESTROY: //终止进程
		PostQuitMessage(0);
		break;

	case WM_CREATE:
	case WM_SIZE:{
			GetClientRect(hwnd, &rect);
			m_nWidth = rect.right - rect.left - 20;
			m_nHeight = (rect.bottom - rect.top - 20) / 6 - 5;

			if(m_nWidth > 0 && m_nHeight > 0){
				for(int i = 0; i < 6; i++){
					int m_nButtonStartY = (m_nHeight + 5) * i + 15;
					if(message == WM_CREATE){
						//按钮创建
						A_hwndButtons[i] = CreateWindow("button", A_pszButtonsText[i], WS_CHILD | WS_VISIBLE | BS_PUSHBUTTON | BS_CENTER | BS_VCENTER,
							10, m_nButtonStartY, m_nWidth, m_nHeight, hwnd, (HMENU)(WM_USER + i), ghThisInst, 0);
					}else if(message == WM_SIZE){
						MoveWindow(A_hwndButtons[i], 10, m_nButtonStartY, m_nWidth, m_nHeight, FALSE);
					}
				}
			}
			InvalidateRect(hwnd, 0, TRUE);
		}
		break;

	case WM_GETMINMAXINFO:{
			LPMINMAXINFO lpmmi = (LPMINMAXINFO) lParam;
			lpmmi->ptMinTrackSize.x = 300;
			lpmmi->ptMinTrackSize.y = 360;
		}
		break;

	case WM_COMMAND:{
			int nCommandID = LOWORD(wParam) - WM_USER;
			char szDisplay[255] = {0};
			sprintf(szDisplay, "%d", nCommandID);
			MessageBox(hwnd, szDisplay, szWinName, MB_OK | MB_ICONINFORMATION);
		}
		break;

	default:
		return DefWindowProc(hwnd, message, wParam, lParam);

	}
	return 0;
}