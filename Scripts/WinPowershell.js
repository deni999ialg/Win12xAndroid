const commands = {
  echo: args => args.join(" "),
  clear: () => {
    log.innerHTML = "";
    return "";
  },
  help: () =>
    "Commands:\n" +
    Object.keys(commands).map(c => " - " + c).join("\n"),
};

const log = document.getElementById("terminal");
const input = document.getElementById("input");

function runCommand(line) {
  const [cmd, ...args] = line.trim().split(/\s+/);

  if (commands[cmd]) return commands[cmd](args);
  return `Unknown command: ${cmd}`;
}

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const text = input.value;
    input.value = "";

    const output = runCommand(text);

    log.innerHTML += `<div>> ${text}</div>`;
    if (output) log.innerHTML += `<pre>${output}</pre>`;
  }
});
