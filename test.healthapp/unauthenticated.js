describe('Unauthenticated user sign-in page', function() {
  var url = 'https://healthapp-cen3031-7b.herokuapp.com/';
  // Testing the routes and redirection
  it('should redirect to welcome/sign-in page', function() {
    expect(browser.driver.getCurrentUrl() == url);
  });
  // Should redirect to own landing page instead of other privileges' respective landing page
  it('should not see other landing pages of other states', function() {
    browser.get(url+'patients');
    expect(browser.getCurrentUrl() === url);
    
    browser.get(url+'admin_landing');
    expect(browser.getCurrentUrl() === url);
  });
  // Testing the contact us modal buttons and alerts
  describe('Contact form', function() {
    beforeEach(function() {
      browser.get(url);
    });
    var nameField = element(by.model('message.user'));
    var messageField = element(by.model('message.text'));
    var form = element(by.name('contactForm'));
    // When user tries to send with blank name field, they see an error message
    it('should open contact us modal and display error message(s)', function() {
      element(by.buttonText('Contact Us')).click().then(function() {
        element(by.buttonText('Send')).click().then(function() {
          expect(element(by.css('.modal-content')).isDisplayed()).toBeTruthy();
        });
      });
    });
    // Open email client with filled out fields
    it('should send if both fields are not blank', function() {
      element(by.buttonText('Contact Us')).click();
      nameField.sendKeys('Unauthorized Ryyann Myykk');
      messageField.sendKeys('Details about my concerns');
      element(by.buttonText('Send')).click().then(function() {
        expect(form.submit());
      });
    });
  });
});