function getJsonWithCallback(url, success, error) {
  'use strict';
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      // xhr.status === 0 is a hack! Only needed when reading local file! 
      // You'd never do this in your production code!
      if (xhr.status === 200 || xhr.status === 0) {
        success(JSON.parse(xhr.responseText));
      } else {
        error(xhr.responseText);
      }
    }
  };
  xhr.open('GET', url);
  xhr.send();
}


function getRecommendedArticleWithCallbacks(id, callback) {

  getJsonWithCallback('assets/profile.json?id='+id, function (user) {
    console.log(JSON.stringify(user));

    getJsonWithCallback('assets/category.json?userId=' + user.id, function (category) {
      console.log(JSON.stringify(category));

      var item = category.items[0];
      getJsonWithCallback('assets/item'+item.id+'.json', function (recommendedItem) {
        console.log(JSON.stringify(recommendedItem));
        callback(recommendedItem);

      }, function (err) {
        console.log('Error reading item'+item.id+'.json :', err);
      });

    }, function (err) {
      console.log('Error reading category.json', err);
    });

  }, function (err) {
    console.log('Error reading profile.json', err);
  });

}


function getJsonWithPromises(url) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();

    request.onreadystatechange = () => {

      if (request.readyState === 4) {
        // xhr.status === 0 is a hack! Only needed when reading local file! 
        // You'd never do this in your production code!
        if (request.status === 200 || request.status === 0) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject(new Error(request.responseText));
        }
      }

    };

    request.onerror = () => {
      reject(new Error('XMLHttpRequest Error: '+request.statusText));
    };

    request.open('GET', url);

    request.send();
  });
}

function getRecommendedArticleWithPromises(id, callback) {
  getJsonWithPromises('assets/profile.json?id='+id)
  .then(user => {
      console.log(JSON.stringify(user));
      return getJsonWithPromises('assets/category.json?userId=' + user.id);
    })
  .then(category => {
      console.log(JSON.stringify(category));
      return getJsonWithPromises('assets/item'+category.items[0].id+'.json');
    })
  .then(item => {
      console.log(JSON.stringify(item));
      callback(null, item);
    })
  .catch(err => {
      console.log(err);
      callback(err);
    });
}

function delayed(msg, ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, ms, msg);
  });
}

export { getRecommendedArticleWithCallbacks, getRecommendedArticleWithPromises, getJsonWithPromises, delayed };
