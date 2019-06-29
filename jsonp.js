

;(function (global) {
  // 导出
  function _export (global, name, handle) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
      module.exports = handle;
    } else if (typeof define === 'function' && define.amd) {
      define([], function () {
        return handle;
      });
  } else {
      global[name] = handle;
    }
  }

  // 获取数据类型
  function getType (data) {
    return Object.prototype.toString.call(data).split(' ')[1].slice(0, -1)
  }

  // 空函数
  function temp () {}
  var id = 0;
  

  _export(global, 'jsonp', function (opt) {    
    if(getType(opt)!=='Object') return;
    var callback_name = opt.callback_name || 'auto_name' 
    var callback_handle = opt.callback_handle
    if(!callback_handle) {
      callback_handle = 'auto_handle' + ++id
    }
    // if(getType(opt.success)!=='Function') return;

    var timer = null;
    var fnError = getType(opt.error)==='Function' ? opt.error : temp
    
    // 定义 jsop 回调
    window[callback_handle] = function (data) {
      opt.success(data)
      clearData()
    }

    // 超时处理
    if(getType(opt.timeout)==='Number') {
      clearTimeout(timer)
      timer = setTimeout(function () {
        loadError('timeout')
      }, opt.timeout)
    }
    
    // 获取数据
    var oScript = document.createElement('script')
    oScript.src = opt.url + (String(opt.url).match(/\?/) ? '&' : '?') + callback_name + '=' + callback_handle;
    oScript.onerror = function () {
      loadError('load fail')
    }
    document.body.appendChild(oScript)
    
    // 加载错误
    function loadError (msg) {
      clearData()
      fnError(msg)
    }

    // 清空信息
    function clearData () {
      window[callback_handle] = temp
      clearTimeout(timer)
      oScript.parentNode && oScript.parentNode.removeChild(oScript);
      oScript = null;
    }

    

  })
}(this));




