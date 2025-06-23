// Script para lógica futura dos botões de gaiola

document.addEventListener('DOMContentLoaded', function() {
    const botoesGaiola = document.getElementById('botoes-gaiola');
    const formulario = document.getElementById('formulario-gaiola');
    const perguntaContainer = document.getElementById('pergunta-container');
    const labelPergunta = document.getElementById('label-pergunta');
    const inputPergunta = document.getElementById('input-pergunta');
    const imagemPergunta = document.getElementById('imagem-pergunta');
    const btnProxima = document.getElementById('btn-proxima');
    const btnVoltar = document.getElementById('btn-voltar');
    const tituloPrincipal = document.getElementById('titulo-principal');
    const botoesCapa = document.getElementById('botoes-capa');
    const tituloCapa = document.getElementById('titulo-capa');
    const btnVoltarGaiola = document.getElementById('btn-voltar-gaiola');
    let modeloCapa = null;

    // Pergunta comum para todos os modelos
    const perguntaUnidades = {
        texto: 'Quantas unidades com essas medidas?',
        campo: 'unidades',
        imagem: '' // sem imagem
    };

    // Perguntas para gaiola quadrada, cada uma com campo para imagem
    const perguntasQuadrada = [
        {
            texto: 'Qual a largura da gaiola (cm)?',
            campo: 'largura',
            imagem: 'src/modelo quadrado/largura.jpg' // Troque aqui para a imagem de largura
        },
        {
            texto: 'Qual o comprimento da gaiola (cm)?',
            campo: 'comprimento',
            imagem: 'src/modelo quadrado/comprimento.jpg' // Troque aqui para a imagem de comprimento
        },
        {
            texto: 'Qual a altura da gaiola (cm)?',
            campo: 'altura',
            imagem: 'src/modelo quadrado/altura.jpg' // Troque aqui para a imagem de altura
        },
        perguntaUnidades
    ];

    // Perguntas para gaiola circular, cada uma com campo para imagem
    const perguntasCircular = [
        {
            texto: 'Qual o comprimento da gaiola (cm)?',
            campo: 'comprimento',
            imagem: 'src/modelo circular/comprimento.jpg' // Troque aqui para a imagem de comprimento
        },
        {
            texto: 'Qual a largura da gaiola (cm)?',
            campo: 'largura',
            imagem: 'src/modelo circular/largura.jpg' // Troque aqui para a imagem de largura
        },
        {
            texto: 'Qual a altura da gaiola (cm)?',
            campo: 'altura',
            imagem: 'src/modelo circular/altura.jpg' // Troque aqui para a imagem de altura
        },
        {
            texto: 'Lateral, do fundo até o gancho (cm)?',
            campo: 'aro',
            imagem: 'src/modelo circular/aro.jpg' // Troque aqui para a imagem do aro
        },
        perguntaUnidades
    ];

    // Perguntas para gaiola semicircular, cada uma com campo para imagem
    const perguntasSemicircular = [
        {
            texto: 'Qual o comprimento da gaiola (cm)?',
            campo: 'comprimento',
            imagem: 'src/modelo semicircular/comprimento.jpg' // Troque aqui para a imagem de comprimento
        },
        {
            texto: 'Qual a largura da gaiola (cm)?',
            campo: 'largura',
            imagem: 'src/modelo semicircular/largura.jpg' // Troque aqui para a imagem de largura
        },
        {
            texto: 'Qual a altura central da gaiola (cm)?',
            campo: 'altura_central',
            imagem: 'src/modelo semicircular/alturaCentral.jpg' // Troque aqui para a imagem de altura central
        },
        {
            texto: 'Qual a altura lateral da gaiola (cm)?',
            campo: 'altura_lateral',
            imagem: 'src/modelo semicircular/alturaLateral.jpg' // Troque aqui para a imagem de altura lateral
        },
        perguntaUnidades
    ];

    let respostas = {};
    let perguntaAtual = 0;
    let perguntasAtuais = perguntasQuadrada;
    let modeloAtual = 'quadrada';

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }

    // Adiciona evento para seleção de capa
    botoesCapa.addEventListener('click', function(e) {
        const btn = e.target.closest('button');
        if (!btn) return;
        modeloCapa = btn.getAttribute('data-capa');
        botoesCapa.style.display = 'none';
        tituloCapa.style.display = 'none';
        document.getElementById('titulo-principal').style.display = 'block';
        botoesGaiola.style.display = 'flex';
        scrollToTop();
    });

    botoesGaiola.addEventListener('click', function(e) {
        const btn = e.target.closest('button');
        if (!btn) return;
        if (!btn.classList.contains('gaiola-btn')) return;
        const tipo = btn.getAttribute('data-tipo');
        if (!tipo) return;
        modeloAtual = tipo;
        // Ajusta perguntas conforme modelo de capa
        if (tipo === 'quadrada') {
            perguntasAtuais = perguntasQuadrada;
        } else if (tipo === 'circular') {
            perguntasAtuais = (modeloCapa === 'lateral')
                ? perguntasCircular.filter(p => !['comprimento','altura'].includes(p.campo))
                : perguntasCircular;
        } else if (tipo === 'semicircular') {
            perguntasAtuais = (modeloCapa === 'lateral')
                ? perguntasSemicircular.filter(p => !['comprimento','altura_central'].includes(p.campo))
                : perguntasSemicircular;
        } else {
            return;
        }
        botoesGaiola.style.display = 'none';
        formulario.style.display = 'block';
        document.getElementById('titulo-principal').style.display = 'none';
        perguntaAtual = 0;
        respostas = {};
        mostrarPergunta();
        scrollToTop();
    });

    function mostrarPergunta() {
        const p = perguntasAtuais[perguntaAtual];
        labelPergunta.textContent = p.texto;
        if (p.imagem) {
            imagemPergunta.src = p.imagem;
            imagemPergunta.style.display = 'block';
        } else {
            imagemPergunta.style.display = 'none';
        }
        inputPergunta.value = '';
        inputPergunta.focus();
        if (perguntaAtual === perguntasAtuais.length - 1) {
            btnProxima.textContent = 'Finalizar';
        } else {
            btnProxima.textContent = 'Próxima';
        }
    }

    btnProxima.addEventListener('click', function() {
        const valor = inputPergunta.value;
        if (!valor) {
            alert('Por favor, preencha o campo antes de continuar.');
            return;
        }
        respostas[perguntasAtuais[perguntaAtual].campo] = valor;
        perguntaAtual++;
        if (perguntaAtual < perguntasAtuais.length) {
            mostrarPergunta();
            scrollToTop();
        } else {
            // Monta mensagem simplificada para WhatsApp
            let mensagem = `Modelo de capa: ${modeloCapa === 'total' ? 'Capa Total' : 'Capa Lateral'}%0A`;
            mensagem += `Modelo de gaiola: ${modeloAtual.charAt(0).toUpperCase() + modeloAtual.slice(1)}%0A`;
            perguntasAtuais.forEach(p => {
                if (p.campo !== 'unidades') {
                    mensagem += `${p.campo}: ${respostas[p.campo]} cm%0A`;
                }
            });
            mensagem += `Unidades: ${respostas['unidades']}`;
            // Ofuscação do número de telefone usando base64
            const encoded = 'NTUzMTk4ODE5NjU1NA==';
            const numero = atob(encoded);
            const url = `https://wa.me/${numero}?text=${mensagem}`;
            window.open(url, '_blank');
            // Após finalizar, volta para seleção de capa
            formulario.style.display = 'none';
            botoesCapa.style.display = 'flex';
            tituloCapa.style.display = 'block';
            document.getElementById('titulo-principal').style.display = 'none';
            scrollToTop();
        }
    });

    btnVoltar.addEventListener('click', function() {
        if (perguntaAtual === 0) {
            formulario.style.display = 'none';
            botoesGaiola.style.display = 'flex';
            document.getElementById('titulo-principal').style.display = 'block';
            scrollToTop();
        } else {
            perguntaAtual--;
            mostrarPergunta();
        }
    });

    btnVoltarGaiola.addEventListener('click', function() {
        botoesGaiola.style.display = 'none';
        tituloPrincipal.style.display = 'none';
        botoesCapa.style.display = 'flex';
        tituloCapa.style.display = 'block';
        scrollToTop();
    });
}); 