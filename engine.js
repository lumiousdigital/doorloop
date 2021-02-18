//din cat in cat se calculeaza pretul
const planIncreaseStep = 20;
//pana la cat merge sliderul (numarul maxim de units)
const maxUnits = 5000;
//dupa cate unitati apare enterprise
const enterpriseAfterUnits = 5000;
//dupa cate units basic devine inactiv
const disableBasicAfter = 160;
//dupa cate units pretul se calculeaza per unit
const pricePerUnitAfterLimit = 500;
//textul care apare sub pret daca e monthly selectat
const monthlyText = 'Billed monthly';
//textul care apare sub pret daca e yearly selectat
const yearlyText = 'Billed yearly';
// json cu toate planurile, daca are ceva custom 'hasCustomSteps': true, si are un array cu setari pentru custom steps, se mai pot adauga si o sa functioneze
//daca nu are nimic custom 'hasCustomSteps': false si nu are array de custom steps
let plans = [
  {
  	'name': 'Basic',
		'startPriceMonthly': 59,
    'startPriceAnnual': 49,
    'hardcodedSteps': [
    	{
      	'from': 1,
        'increaseByMonthly': 25,
        'increaseByAnnual': 20,
      },
      {
      	'from': 21,
        'increaseByMonthly': 25,
        'increaseByAnnual': 20,
      },
      {
      	'from': 41,
        'increaseByMonthly': 25,
        'increaseByAnnual': 20,
      },
      {
      	'from': 61,
        'increaseByMonthly': 25,
        'increaseByAnnual': 20,
      },
      {
      	'from': 81,
        'increaseByMonthly': 25,
        'increaseByAnnual': 20,
      },
      {
      	'from': 101,
        'increaseByMonthly': 25,
        'increaseByAnnual': 20,
      },
      {
      	'from': 121,
        'increaseByMonthly': 25,
        'increaseByAnnual': 20,
      },
      {
      	'from': 141,
        'increaseByMonthly': 25,
        'increaseByAnnual': 20,
      },
      {
      	'from': 161,
        'increaseByMonthly': 25,
        'increaseByAnnual': 20,
      },
      {
      	'from': 181,
        'increaseByMonthly': 25,
        'increaseByAnnual': 20,
      },
      {
      	'from': 201,
        'increaseByMonthly': 25,
        'increaseByAnnual': 20,
      },
    ]
  },
  {
  	'name': 'Standard',
		'startPriceMonthly': 79,
    'startPriceAnnual': 59,
    'pricePerUnitMonthly': 1.5,
    'pricePerUnitAnnual': 1.25,
    'hardcodedSteps': [
    	{
      	'from': 1,
        'increaseByMonthly': 30,
        'increaseByAnnual': 20,
      },
      {
      	'from': 21,
        'increaseByMonthly': 30,
        'increaseByAnnual': 20,
      },
      {
      	'from': 41,
        'increaseByMonthly': 20,
        'increaseByAnnual': 20,
      },
      {
      	'from': 61,
        'increaseByMonthly': 20,
        'increaseByAnnual': 20,
      },
      {
      	'from': 81,
        'increaseByMonthly': 20,
        'increaseByAnnual': 20,
      },
      {
      	'from': 101,
        'increaseByMonthly': 20,
        'increaseByAnnual': 20,
      },
      {
      	'from': 121,
        'increaseByMonthly': 20,
        'increaseByAnnual': 20,
      },
      {
      	'from': 141,
        'increaseByMonthly': 30,
        'increaseByAnnual': 20,
      },
      {
      	'from': 161,
        'increaseByMonthly': 30,
        'increaseByAnnual': 20,
      },
      {
      	'from': 181,
        'increaseByMonthly': 30,
        'increaseByAnnual': 20,
      },
      {
      	'from': 201,
        'increaseByMonthly': 30,
        'increaseByAnnual': 20,
      },
    ]
  },
  {
  	'name': 'Pro',
		'startPriceMonthly': 139,
    'startPriceAnnual': 109,
    'pricePerUnitMonthly': 3,
    'pricePerUnitAnnual': 2.5,
    'hardcodedSteps': [
    	{
      	'from': 1,
        'increaseByMonthly': 50,
        'increaseByAnnual': 40,
      },
      {
      	'from': 21,
        'increaseByMonthly': 50,
        'increaseByAnnual': 40,
      },
      {
      	'from': 41,
        'increaseByMonthly': 50,
        'increaseByAnnual': 40,
      },
      {
      	'from': 61,
        'increaseByMonthly': 50,
        'increaseByAnnual': 40,
      },
      {
      	'from': 81,
        'increaseByMonthly': 50,
        'increaseByAnnual': 40,
      },
      {
      	'from': 101,
        'increaseByMonthly': 50,
        'increaseByAnnual': 40,
      },
      {
      	'from': 121,
        'increaseByMonthly': 50,
        'increaseByAnnual': 40,
      },
      {
      	'from': 141,
        'increaseByMonthly': 50,
        'increaseByAnnual': 40,
      },
      {
      	'from': 161,
        'increaseByMonthly': 50,
        'increaseByAnnual': 40,
      },
      {
      	'from': 181,
        'increaseByMonthly': 50,
        'increaseByAnnual': 40,
      },
      {
      	'from': 201,
        'increaseByMonthly': 50,
        'increaseByAnnual': 40,
      },
    ]
  }
];

//se creeaza sliderul
const tooltip = document.createElement('div')
const slider = document.querySelector('input[type="range"]');
const quantity = $('#quantity');

//se initializeaza toggle switchery
const elem = document.querySelector('.js-switch');
const init = new Switchery(elem, {
    // primary color
    color: '#dfdfdf',
    // secondary color
    secondaryColor: '#dfdfdf',
    // primary handle color
    jackColor: '#5d97f0',
    // secondary handle color
    jackSecondaryColor: '#5d97f0',
    // default CSS class
    className: 'switchery',
    // enable/disable click/tap events on the switch
    disabled: false,
    // opacity when disabled
    disabledOpacity: 0.5,
    // animation speed
    speed: '0.4s',
    // 'small', 'default', 'large'
    size: 'small'
});

//tooltip-ul pentru slider
const createTooltip = (rangeSlider) => {
	const handleEl = rangeSlider.handle;
  tooltip.classList.add('tooltip');
  handleEl.appendChild(tooltip);
  tooltip.textContent = rangeSlider.value;
};

// se initializeaza sliderul
const initializeSlider = () => {
  return rangeSlider.create(slider, {
 		min: 1,          // Number , 0
    max: maxUnits,          // Number, 100
    step: 1,         // Number, 1
    value: 1,
    onSlide: (value, percent, position) => {
      tooltip.textContent = value;
      quantity.val(value);
      disableBasic(value);
      showPrices(quantity.val(), getPricing(value));
    }
  });
};

initializeSlider();
createTooltip(slider.rangeSlider);
changeBillingPeriod($('.js-switch').is(':checked'));
//se seteaza preturile initiale
for (let plan of plans) {
  $('#' + plan.name + 'PriceMonthly').text(plan.startPriceMonthly);
	$('#' + plan.name + 'PriceYearly').text(plan.startPriceAnnual);
}

$('#max-units').text(enterpriseAfterUnits);

//eventul care se propaga atunci cand scrii in input
$("#quantity").on('input', () => {
  if ($('#quantity').val() === '0') $('#quantity').val(1);
  let value = $('#quantity').val();
  updateSlider(value);
  disableBasic(value);
  showPrices(value, getPricing(value));
});

elem.onchange = () => {
	changeBillingPeriod($('.js-switch').is(':checked'));
};

function changeBillingPeriod(monthly) {
	if(!monthly) {
  	$('.monthly-price').show();
    $('.yearly-price').hide();
    $('.period-text').text(monthlyText);
  } else {
  	$('.monthly-price').hide();
    $('.yearly-price').show();
    $('.period-text').text(yearlyText);
  }
}

//updateaza pozitia si tooltipul la slider
function updateSlider(value) {
  let inputRange = document.querySelector('input[type="range"]'),
      event = document.createEvent('Event');
  if (!value) value = '1';
  event.initEvent('change', true, true);
  inputRange.value = value;
  inputRange.dispatchEvent(event);
  $('.tooltip').text(value <= maxUnits ? value : maxUnits + '+');
}

//face inactiv planul basic dupa numarul de units stabilit sus
function disableBasic(quantity) {
	if (quantity > disableBasicAfter) {
    $('#BasicActive').hide();
    $('#BasicInactive').show();
    $('#BasicInactive').text('Max ' + disableBasicAfter + ' units');
    $('#plan1').addClass('inactive-plan');
  } else {
    $('#BasicActive').show();
    $('#BasicInactive').hide();
    $('#plan1').removeClass('inactive-plan');
  }
}

// updateaza preturile
function showPrices(quantity, prices) {
	if (quantity < enterpriseAfterUnits) {
    $('#enterprise-block').fadeOut(300);
    for (let plan of prices) {
      $('#' + plan.planName + 'PriceMonthly').text(Math.ceil(plan.monthlyPrice).toLocaleString('us-US'));
      $('#' + plan.planName + 'PriceYearly').text(Math.ceil(plan.annualPrice).toLocaleString('us-US'));
    }
  } else {
    $('#enterprise-block').fadeIn(500);
  }
}


//calculeaza preturile in functie de jsonul cu setari de mai sus
function calulatePrice(plan, quantity) {
  const planData = plans.find(x => x.name === plan);
  let priceYearly = 0;
  let priceMonthly = 0;

  let extraUnits = 0
  if (quantity > pricePerUnitAfterLimit) {
    extraUnits = quantity - pricePerUnitAfterLimit;
    quantity = pricePerUnitAfterLimit;
  }
  priceYearly = planData.startPriceAnnual;
  priceMonthly = planData.startPriceMonthly;
  let increaseByAnnual = 0;
  let increaseByMonthly = 0;
  planData.hardcodedSteps = planData.hardcodedSteps.sort((a, b) => b.from - a.from)
  for (let i = 0; i < Math.trunc(quantity / planIncreaseStep); i++) {
    let from = quantity % planIncreaseStep === 0 ?
        i * planIncreaseStep - quantity % planIncreaseStep + 1 :
    (i + 1) * planIncreaseStep + 1;
    for (let j = 0; j < planData.hardcodedSteps.length; j++) {
      if (from > planData.hardcodedSteps[j].from-1 && from !== 1) {
        increaseByAnnual = planData.hardcodedSteps[j].increaseByAnnual;
        increaseByMonthly = planData.hardcodedSteps[j].increaseByMonthly;
        break;
      }
    }
    priceYearly += increaseByAnnual;
    priceMonthly += increaseByMonthly;
  }
  if (extraUnits) {
    priceYearly += extraUnits * planData.pricePerUnitAnnual;
    priceMonthly += extraUnits * planData.pricePerUnitMonthly;
  }

	return { priceYearly, priceMonthly }
}

//returneaza un array cu preturile pentru toate 3 planuri
function getPricing(value) {
	let response = [];

  for (let plan of plans) {
   const prices = calulatePrice(plan.name, value);
   if (plan.name === 'Basic' && value > disableBasicAfter) continue;
   response.push({
     planName: plan.name,
     monthlyPrice: prices.priceMonthly,
     annualPrice: prices.priceYearly
   });
  }
  return response;
}
