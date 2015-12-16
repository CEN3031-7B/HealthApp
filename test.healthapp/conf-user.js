exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['user.js'],
  // Login as user before testing
  onPrepare: function() {
    browser.get('https://healthapp-cen3031-7b.herokuapp.com/');

    browser.findElement(by.id('username')).sendKeys('newusername');
    browser.findElement(by.id('password')).sendKeys('1qaz@WSX3edc');
    browser.findElement(by.buttonText('Sign in')).click();
    // Finished logging in when /patients/
    return browser.wait(function() {
      return browser.getCurrentUrl().then(function(url) {
        return /patients/.test(url);
      });
    }, 10000);
  }
};
