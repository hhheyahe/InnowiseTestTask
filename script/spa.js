import { MainPageComponent } from './pageComponents';
import '../styles/style.css'

const router = {
	main: MainPageComponent,
};

const mySPA = (function () {

	/* CONTROLLER START -------------------------------- */

	function ModuleController() {
		let myModuleContainer = null;
		let myModuleModel = null;

		this.init = function (container, model) {
			myModuleContainer = container;
			myModuleModel = model;

			window.addEventListener("hashchange", this.updateState);
			this.bindEvents();

			this.updateState();
		}

		this.bindEvents = function() {
			myModuleContainer.addEventListener('click', (event) => {
				if (event.target.tagName === 'BUTTON') {
					const buttonValue = event.target.textContent;
					myModuleModel.handleButtonClick(buttonValue);
				}
			});
		}

		this.updateState = async function () {
			const hashPageName = location.hash.slice(1).toLowerCase();
			myModuleModel.updateState(hashPageName);
		};
	}

	/* CONTROLLER END -------------------------------- */

	/* MODEL START -------------------------------- */

	function ModuleModel() {
		let myModuleView = null;
		let currentInput = '';
		let currentOperation = null;
		let previousInput = '';

		this.init = function (view) {
			myModuleView = view;
		}

		this.updateState = function (hashPageName) {
			myModuleView.renderContent(hashPageName);
		}

		this.handleButtonClick = function (buttonValue) {
			if (!isNaN(buttonValue) || buttonValue === '.') {
				currentInput += buttonValue;
				myModuleView.updateResult(currentInput);
			} else if (buttonValue === 'AC') {
				this.clear();
			} else if (buttonValue === '±') {
				this.toggleSign();
			} else if (buttonValue === '%') {
				this.calculatePercentage();
			} else {
				this.performOperation(buttonValue);
			}
		}

		this.clear = function () {
			currentInput = '';
			previousInput = '';
			currentOperation = null;
			myModuleView.updateResult(currentInput);
		}

		this.toggleSign = function () {
			if (currentInput) {
				currentInput = String(-parseFloat(currentInput));
				myModuleView.updateResult(currentInput);
			}
		}

		this.calculatePercentage = function () {
			if (currentInput) {
				currentInput = String(parseFloat(currentInput) / 100);
				myModuleView.updateResult(currentInput);
			}
		}

		this.performOperation = function (operation) {
			if (currentInput) {
				if (previousInput) {
					this.calculate();
				}
				currentOperation = operation;
				previousInput = currentInput;
				currentInput = '';
			}
		}

		this.calculate = function () {
			let result;
			const prev = parseFloat(previousInput);
			const current = parseFloat(currentInput);

			if (isNaN(prev) || isNaN(current)) return;

			switch (currentOperation) {
				case '+':
					result = prev + current;
					break;
				case '-':
					result = prev - current;
					break;
				case '×':
					result = prev * current;
					break;
				case '÷':
					if (current !== 0) {
						result = prev / current;
					} else {
						result = 'Ошибка';
					}
					break;
				default:
					return;
			}

			currentInput = String(result);
			currentOperation = null;
			previousInput = '';
			myModuleView.updateResult(currentInput);
		}
	};

	/* MODEL END -------------------------------- */

	/* VIEW START --------------------------------*/

	function ModuleView() {
		let myModuleContainer = null;

		this.init = function (container) {
			myModuleContainer = container;
		}

		this.renderContent = function () {
			let routeName = 'main';

			window.document.title = router[routeName].title;
			myModuleContainer.innerHTML = router[routeName].render(`${routeName}-page`);
		}

		this.updateResult = function (result) {
			document.getElementById('result').textContent = result;
		}
	};

	/* VIEW END --------------------------------*/

	return {
		init: function ({ container, router }) {
			this.main(container);

			const view = new ModuleView();
			const controller = new ModuleController();
			const model = new ModuleModel();

			view.init(document.getElementById(container), router);
			model.init(view);
			controller.init(document.getElementById(container), model);
		},
	}
}());

document.addEventListener("DOMContentLoaded", mySPA.init({
	container: "wrapper",
	router: router,
}));