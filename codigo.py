import pyautogui
# pyautogui.click -> clicar
# pyautogui.moveTo -> mover o mouse
# pyautogui.write -> escrever
# pyautogui.press -> pressionar uma tecla
# pyautogui.hotkey -> pressionar um atalho (ex: ctrl+c)

# passo a passo do seu programa 
# Passo 1: entrar no sistema da empresa
# Abrir navegador 
site = "https://alecsilverio.github.io/automacao-cadastro/"
pyautogui.PAUSE = 1 # tempo de espera entre cada comando

pyautogui.press("win")
pyautogui.write("edge")
pyautogui.press("enter")
pyautogui.write(site)
pyautogui.press("enter")

#pausa para o site carregar
pyautogui.sleep(1)
# Passo 2:Abrir base de dados
import pandas

tabela = pandas.read_csv("pessoas.csv")
print(tabela)

# Passo 3: cadastrar a primeira pessoa da base de dados
for linha in tabela.index:
    pyautogui.click(x=368, y=357)
    pyautogui.write("Ana Souza") # escrever o nome da pessoa
    pyautogui.press("tab") # pressionar a tecla tab para ir para o próximo campo
    # cadastrar email 
    pyautogui.write("ana.souza@email.com")
    pyautogui.press("tab")
    # cadastrar telefone
    pyautogui.write("(67) 99911-2233")
    pyautogui.press("tab")
    pyautogui.press("enter") # clicar no botão cadastrar

# Passo 4: cadastrar ate acabar a base de dadosana.souza@email.com  

