exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['diseases.js'],
  // Login as admin before testing
  onPrepare: function() {
    browser.get('https://healthapp-cen3031-7b.herokuapp.com/');

    browser.findElement(by.id('username')).sendKeys('freshadmin');
    browser.findElement(by.id('password')).sendKeys('1qaz@WSX3edc');
    browser.findElement(by.buttonText('Sign in')).click();
    // Finished logging in when /admin_landing/
    return browser.wait(function() {
      return browser.getCurrentUrl().then(function(url) {
        return /admin_landing/.test(url);
      });
    }, 10000);
  }
};
