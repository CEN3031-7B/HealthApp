describe('Unauthenticated user sign-in page', function() {
	var url = 'https://healthapp-cen3031-7b.herokuapp.com/';

  /*it('should redirect to welcome/sign-in page', function() {
    expect(browser.getCurrentUrl() === url);
  });*/
  it('should not see other landing pages of other states', function() {
  	browser.get('https://healthapp-cen3031-7b.herokuapp.com/patients/');
  	expect(browser.getCurrentUrl() === url);
  	
  	browser.get('https://healthapp-cen3031-7b.herokuapp.com/admin_landing/');
  	expect(browser.getCurrentUrl() === url);
  });
});

describe('Contact form', function() {
  var nameField = element(by.model('message.user'));
  var messageField = element(by.model('message.text'));
  var form = element(by.name('contactForm'));

  it('should open contact us modal, display error message(s), and close when cancelled', function() {
    element(by.buttonText('Contact Us')).click().then(function() {
      element(by.buttonText('Send')).click().then(function() {
        expect(element(by.className('modal-body')).isDisplayed()).toBe(true);
      });
    });
    element(by.buttonText('Cancel')).click().then(function() {
      expect(element(by.className('modal-body')).isDisplayed()).toBe(false);
    });
  });
  it('should send if both fields are not blank', function() {
    element(by.buttonText('Contact Us')).click();
    nameField.sendKeys('Unauthorized Ryyann Myykk');
    messageField.sendKeys('Details about my concerns');
    element(by.buttonText('Send')).click().then(function() {
      expect(form.submit());
    });
  });
});