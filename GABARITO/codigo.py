import pyautogui
# pyautogui.click -> clicar
# pyautogui.moveTo -> mover o mouse
# pyautogui.write -> escrever
# pyautogui.press -> pressionar uma tecla
# pyautogui.hotkey -> pressionar um atalho (ex: ctrl+c)

# passo a passo do seu programa 
# Passo 1: entrar no sistema da empresa
# Abrir navegador 
site = "https://alecsilverio.github.io/telessaude-site/"
pyautogui.PAUSE = 1 # tempo de espera entre cada comando

pyautogui.press("win")
pyautogui.write("edge")
pyautogui.press("enter")
pyautogui.write(site)
pyautogui.press("enter")

#pausa para o site carregar
pyautogui.sleep(5)
