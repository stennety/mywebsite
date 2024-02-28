using System;
using UnityEngine;
using WebSocketSharp;

namespace Network.Handler
{
    public class WebSocketHandler
    {
        private WebSocket webSocket;
        private string serverURL;

        public WebSocketHandler(string serverURL)
        {
            this.serverURL = serverURL;
        }

        // 서버에 연결
        public void Connect()
        {
            webSocket = new WebSocket(serverURL);
            webSocket.OnOpen += OnOpen;
            webSocket.OnMessage += OnMessage;
            webSocket.OnError += OnError;
            webSocket.OnClose += OnClose;

            webSocket.Connect();
        }

        // 연결이 열렸을 때 호출되는 콜백
        private void OnOpen(object sender, EventArgs e)
        {
            Debug.Log("Connected to WebSocket server.");
        }

        // 메시지 수신 시 호출되는 콜백
        private void OnMessage(object sender, MessageEventArgs e)
        {
            Debug.Log($"Received message: {e.Data}");
        }

        // 에러 발생 시 호출되는 콜백
        private void OnError(object sender, ErrorEventArgs e)
        {
            Debug.LogError($"WebSocket error: {e.Message}");
        }

        // 연결이 닫혔을 때 호출되는 콜백
        private void OnClose(object sender, CloseEventArgs e)
        {
            Debug.Log("WebSocket connection closed.");
        }

        // 데이터 송신
        public void SendData(string data)
        {
            if (webSocket != null && webSocket.IsAlive)
            {
                webSocket.Send(data);
            }
            else
            {
                Debug.LogError("WebSocket connection is not open.");
            }
        }

        // 연결 종료
        public void Disconnect()
        {
            if (webSocket != null && webSocket.IsAlive)
            {
                webSocket.Close();
            }
        }
    }
}