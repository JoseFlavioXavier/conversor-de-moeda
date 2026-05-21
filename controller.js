// limpa o input e reseta a tela
const clearButton = () => {
    document.getElementById("amount-input").value = '';
    
    const rateDisplay = document.getElementById("rate-display");
    const resultValue = document.getElementById("result-value");
    
    if (rateDisplay) rateDisplay.innerText = 'Aguardando API...';
    if (resultValue) resultValue.innerText = '--';
}

//Validação da conversão
const validateAndConvert = () => {
    const rawValue = document.getElementById("amount-input").value;

    if (rawValue.trim() === '') {
        alert("Favor, digite um valor para converter");
        return; 
    }

    const clearValue = rawValue.trim().replace(",", ".");

    if (isNaN(clearValue)) {
        alert("Digite apenas valores válidos (exemplo: 10 ou 10,5)");
        return; 
    }

    const currencyToBeConverted = parseFloat(clearValue);

    if (currencyToBeConverted <= 0) {
        alert("Você precisa digitar um valor maior do que zero");
        return;
    }

    console.log("Pronto para uso:", currencyToBeConverted);
    return currencyToBeConverted;
}

//Consumo de API (Lógica dupla: multiplica ou divide)
const fetchExchangeRate = async (amount) => {
    const url = "https://economia.awesomeapi.com.br/last/USD-BRL";

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro ao carregar os dados da API");

        const data = await response.json();
        const exchangeRate = parseFloat(data.USDBRL.bid);

        
        const direction = document.getElementById("direction-select").value;

        let convertedValue = 0;
        let resultText = "";

    
        if (direction === "BRL-USD") {
            convertedValue = amount / exchangeRate; 
            resultText = `$ ${convertedValue.toFixed(2)}`;
        } else {
            convertedValue = amount * exchangeRate; 
            resultText = `R$ ${convertedValue.toFixed(2)}`;
        }

        // Atualiza os elementos na tela
        const rateDisplay = document.getElementById("rate-display"); 
        const resultValue = document.getElementById("result-value"); 

        if (rateDisplay) {
            rateDisplay.innerText = `R$ ${exchangeRate.toFixed(2)}`;
        }
        
        if (resultValue) {
            resultValue.innerText = resultText;
        }

    } catch (error) { 
        console.error("Algo deu errado:", error);
        alert("Não foi possível acessar a taxa de câmbio");
    }
}; 

// Função principal 
const handleConversion = async () => {
    const valueToConvert = validateAndConvert();

    if (typeof valueToConvert === 'number') {
        await fetchExchangeRate(valueToConvert);
    }
}

//Ativação dos botões
document.getElementById("convert-btn").addEventListener("click", handleConversion);