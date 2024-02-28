using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using UnityEngine;

namespace Network.Handler
{
    public class SocketHandler
    {
        private Socket socket;
        private IPAddress serverIP;
        private int port;
        private byte[] buffer = new byte[1024]; // 데이터를 수신할 버퍼

        public SocketHandler(string serverIP, int port)
        {
            this.serverIP = IPAddress.Parse(serverIP);
            this.port = port;
        }

        // 서버에 연결
        public void Connect()
        {
            try
            {
                socket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
                socket.Connect(new IPEndPoint(serverIP, port));
                Debug.Log("Connected to server.");
                
                // 연결 후 데이터 수신을 위해 비동기 수신 작업 시작
                socket.BeginReceive(buffer, 0, buffer.Length, SocketFlags.None, ReceiveCallback, null);
            }
            catch (Exception ex)
            {
                Debug.LogError($"Error connecting to server: {ex.Message}");
            }
        }

        // 데이터 송신
        public void SendData(string data)
        {
            try
            {
                byte[] byteData = Encoding.UTF8.GetBytes(data);
                socket.Send(byteData);
            }
            catch (Exception ex)
            {
                Debug.LogError($"Error sending data: {ex.Message}");
            }
        }

        // 연결 종료
        public void Disconnect()
        {
            try
            {
                socket.Shutdown(SocketShutdown.Both);
                socket.Close();
                Debug.Log("Disconnected from server.");
            }
            catch (Exception ex)
            {
                Debug.LogError($"Error disconnecting from server: {ex.Message}");
            }
        }

        // 데이터 수신 콜백
        private void ReceiveCallback(IAsyncResult result)
        {
            try
            {
                int bytesRead = socket.EndReceive(result);
                if (bytesRead > 0)
                {
                    string receivedData = Encoding.UTF8.GetString(buffer, 0, bytesRead);
                    Debug.Log($"Received data: {receivedData}");

                    // 데이터를 다시 수신하기 위해 비동기 수신 작업 재개
                    socket.BeginReceive(buffer, 0, buffer.Length, SocketFlags.None, ReceiveCallback, null);
                }
            }
            catch (Exception ex)
            {
                Debug.LogError($"Error receiving data: {ex.Message}");
            }
        }
    }
}