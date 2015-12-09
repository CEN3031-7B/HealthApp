describe('Administrator landing page', function() {
	var url = 'https://healthapp-cen3031-7b.herokuapp.com/';
	beforeEach(function() {
		browser.get(url+'admin_landing');
  });
  it('should redirect to admin landing page', function() {
  	expect(browser.driver.getCurrentUrl() === url+'admin_landing');
  });
  it('should not see other landing pages of other states', function() {
  	browser.get(url);
  	expect(browser.driver.getCurrentUrl() === url);
  	
  	browser.get(url+'patients');
  	expect(browser.driver.getCurrentUrl() === url+'patients');
  });
  describe('Buttons when clicked', function() {
	  it('should go to patient portal', function() {
			element(by.cssContainingText('.button_admin', 'Manage Patient')).click();
  		expect(browser.driver.getCurrentUrl() === url+'patients');
		});
  	it('should go to create user modal and create admin', function() {
  		element(by.buttonText('Create User')).click().then(function() {
        expect(element(by.css('.signin')).isPresent()).toBe(true);
        element(by.model('credentials.username')).sendKeys('protractorusername');
        element(by.model('credentials.firstName')).sendKeys('Protractor');
        element(by.model('credentials.lastName')).sendKeys('Username');
        element(by.model('credentials.email')).sendKeys('testing@iscool.com');
        element(by.model('credentials.password')).sendKeys('1qaz@WSX3edc');
        element(by.model('credentials.admin')).click().then(function() {
          expect(element(by.model('credentials.admin')).getAttribute('value').toEqual('0'));
        });
      });
      element(by.buttonText('Send')).click().then(function() {
        expect(form.submit());
      });
  	});
    it('should go to create user modal and create non-admin user', function() {
      element(by.buttonText('Create User')).click().then(function() {
        expect(element(by.css('.signin')).isPresent()).toBe(true);
        element(by.model('credentials.username')).sendKeys('protractornonadmin');
        element(by.model('credentials.firstName')).sendKeys('Protractor');
        element(by.model('credentials.lastName')).sendKeys('Nonadmin');
        element(by.model('credentials.email')).sendKeys('testing@isnecessary.com');
        element(by.model('credentials.password')).sendKeys('1qaz@WSX3edc');
        element(by.model('credentials.admin')).click().then(function() {
          expect(element(by.model('credentials.admin')).getAttribute('value').toEqual('1'));
        });
      });
      element(by.buttonText('Send')).click().then(function() {
        expect(form.submit());
      });
    });
  	it('should go to user portal', function() {
  		element(by.buttonText('Manage User')).click();
  		expect(browser.getCurrentUrl() === url+'users');
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
      nameField.sendKeys('Admin Sammantha Yjynnynn');
      messageField.sendKeys('Details about my concerns');
      element(by.buttonText('Send')).click().then(function() {
        expect(form.submit());
      });
    });
  });
});