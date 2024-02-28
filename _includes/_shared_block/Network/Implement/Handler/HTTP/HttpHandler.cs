using System;
using System.Text;
using UnityEngine;
using UnityEngine.Networking;
using LitJson;

namespace Network.Handler
{
    public class HttpHandler
    {
        private readonly string serverURL;

        public HttpHandler(string serverURL)
        {
            if (string.IsNullOrEmpty(serverURL))
            {
                Debug.LogError("[HttpHandler] Server URL is null or empty.");
            }

            this.serverURL = serverURL;
        }

        public IEnumerator RequestPost(string url, object body, XHeader header, Action<JsonData> callback, Action<UnityWebRequest> errorCallback = null)
        {
            yield return SendRequest($"{serverURL}/{url}", "POST", body, header, callback, errorCallback);
        }

        public IEnumerator RequestGet(string url, object body, XHeader header, Action<JsonData> callback, Action<UnityWebRequest> errorCallback = null)
        {
            yield return SendRequest($"{serverURL}/{url}", "GET", body, header, callback, errorCallback);
        }

        public IEnumerator RequestDelete(string url, object body, XHeader header, Action<JsonData> callback, Action<UnityWebRequest> errorCallback = null)
        {
            yield return SendRequest($"{serverURL}/{url}", "DELETE", body, header, callback, errorCallback);
        }

        public IEnumerator RequestPut(string url, object body, XHeader header, Action<JsonData> callback, Action<UnityWebRequest> errorCallback = null)
        {
            yield return SendRequest($"{serverURL}/{url}", "PUT", body, header, callback, errorCallback);
        }

        private IEnumerator SendRequest(string url, string method, object body, XHeader header, Action<JsonData> callback, Action<UnityWebRequest> errorCallback)
        {
            using (UnityWebRequest req = new UnityWebRequest(url, method))
            {
                Debug.Log($"API {method} URL: {url}");

                if (body != null)
                {
                    string sendJson = JsonMapper.ToJson(body);
                    byte[] bytes = Encoding.UTF8.GetBytes(sendJson);
                    req.uploadHandler = new UploadHandlerRaw(bytes);
                }

                req.downloadHandler = new DownloadHandlerBuffer();

                if (header == null)
                {
                    Debug.LogError("[HttpHandler] Header is null.");
                    yield break;
                }

                SetRequestHeader(header, req);

                yield return req.SendWebRequest();

                if (req.result != UnityWebRequest.Result.Success)
                {
                    Debug.LogError($"[{method}][{url}]\n{req.result}/{req.error}\n{req.downloadHandler.text}");
                    errorCallback?.Invoke(req);
                }
                else
                {
                    var downloadJson = JsonMapper.ToObject(req.downloadHandler.text);
                    Debug.Log(req.downloadHandler.text);
                    callback?.Invoke(downloadJson);
                }
            }
        }

        private void SetRequestHeader(XHeader header, UnityWebRequest req)
        {
            req.SetRequestHeader("ostype", header.ostype);
            req.SetRequestHeader("deviceid", header.deviceid);
            req.SetRequestHeader("devicetoken", header.devicetoken);
            req.SetRequestHeader("appver", header.appver);
            req.SetRequestHeader("osinfo", header.osinfo);
            req.SetRequestHeader("devicemodel", header.devicemodel);
            req.SetRequestHeader("clientid", header.clientid);
            req.SetRequestHeader("account", header.account);

            if (!string.IsNullOrEmpty(header.accessToken))
            {
                req.SetRequestHeader("accesstoken", header.accessToken);
                req.SetRequestHeader("refreshtoken", header.refreshToken);
            }
        }
    }
}