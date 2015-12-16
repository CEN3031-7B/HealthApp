//Generates a disease, edits the disease and deletes the created disease
describe('Disease Portal', function() {
	var SEARCH_NAME = 'Diabetes';
	var TEST_NAME = 'Test';
	var EDIT_SUGGESTION_NAME = 'Edit Test';
	var EDIT_SUGGESTION_FIELD = 'Referrals';

	//Directs to the disease portal
	it('should go to disease portal', function() {
        element(by.className('user-header-dropdown-toggle')).click();
        element(by.className('diseasePortal')).click();
	});

	//Checks to see if the filter function works
	it('should filter diseases by name', function() {
		var search = element(by.model('search.diseaseName'));
		search.sendKeys(SEARCH_NAME);

		var name = element(by.binding('disease.diseaseName'));
		name.getText().then(function(text) {
		  expect(SEARCH_NAME == name);
		});
	});

	//Create Disease
	it('should create a disease named Test', function() {
		element(by.cssContainingText('.btn', 'Create a Disease')).click();

		element(by.model('diseaseName')).sendKeys(TEST_NAME);
		element(by.model('suggestion.name')).sendKeys('test suggestion');

		//Should not redirect when required fields are not filled
		element(by.cssContainingText('.btn', 'Submit')).click();

		element(by.model('suggestion.field')).sendKeys('Education');
		element(by.cssContainingText('.btn', 'Submit')).click();
	});

	//Edits disease created in last spec
	it('should edit a disease named Test', function() {
		element(by.className('glyphicon-edit')).click();
		element(by.cssContainingText('.btn', 'Add Suggestion')).click();

		var sugg = element(by.repeater('suggestion in suggestions').row(1));
		sugg.element(by.model('suggestion.name')).sendKeys(EDIT_SUGGESTION_NAME);

		//Should not redirect when required fields are not filled
		element(by.cssContainingText('.btn', 'Submit')).click();

		sugg.element(by.model('suggestion.field')).sendKeys(EDIT_SUGGESTION_FIELD);
		element(by.cssContainingText('.btn', 'Submit')).click();

		var editedTextName = element(by.repeater('sugg in disease.suggestions').row(1).column('sugg.name'));
		var editedTextField = element(by.repeater('sugg in disease.suggestions').row(1).column('sugg.field'));

		editedTextName.getText().then(function() {
			expect(EDIT_SUGGESTION_NAME == editedTextName);
		});
		
		editedTextField.getText().then(function() {
			expect(EDIT_SUGGESTION_FIELD == editedTextField);
		});
	});

	//Deletes disease and checks to see whether or not it is still listed
	it('should delete a disease', function() {
		element(by.className('glyphicon-trash')).click();

		//Searches for a disease named TEST_NAME
		var search = element(by.model('search.diseaseName'));
		search.sendKeys(TEST_NAME);

		expect(element(by.binding('disease.diseaseName')).isPresent()).toBeFalsy();
	});
});