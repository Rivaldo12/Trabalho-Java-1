import java.util.ArrayList;
import java.util.Date;
import java.util.Scanner;

class Vaga {
    private int numero;
    private String tamanho;
    private boolean disponivel;

    public Vaga(int numero, String tamanho) {
        this.numero = numero;
        this.tamanho = tamanho;
        this.disponivel = true;
    }

    public int getNumero() {
        return numero;
    }

    public String getTamanho() {
        return tamanho;
    }

    public boolean isDisponivel() {
        return disponivel;
    }

    public void ocupar() {
        this.disponivel = false;
    }

    public void liberar() {
        this.disponivel = true;
    }
}

class Veiculo {
    private String placa;
    private String modelo;
    private String tamanho;
    private Date horaEntrada;
    private Date horaSaida;

    public Veiculo(String placa, String modelo, String tamanho) {
        this.placa = placa;
        this.modelo = modelo;
        this.tamanho = tamanho;
    }

    public String getPlaca() {
        return placa;
    }

    public String getModelo() {
        return modelo;
    }

    public String getTamanho() {
        return tamanho;
    }

    public Date getHoraEntrada() {
        return horaEntrada;
    }

    public Date getHoraSaida() {
        return horaSaida;
    }

    public void setHoraEntrada(Date horaEntrada) {
        this.horaEntrada = horaEntrada;
    }

    public void setHoraSaida(Date horaSaida) {
        this.horaSaida = horaSaida;
    }

    public long calcularTempoPermanencia() {
        if (horaEntrada != null && horaSaida != null) {
            return (horaSaida.getTime() - horaEntrada.getTime()) / (1000 * 60 * 60);
        }
        return 0;
    }
}

class Estacionamento {
    private ArrayList<Vaga> vagas;
    private ArrayList<Veiculo> historico;

    public Estacionamento() {
        this.vagas = new ArrayList<>();
        this.historico = new ArrayList<>();
    }

    public void adicionarVaga(int numero, String tamanho) {
        vagas.add(new Vaga(numero, tamanho));
    }

    public boolean registrarEntradaVeiculo(Veiculo veiculo) {
        for (Vaga vaga : vagas) {
            if (vaga.isDisponivel() && vaga.getTamanho().equalsIgnoreCase(veiculo.getTamanho())) {
                vaga.ocupar();
                veiculo.setHoraEntrada(new Date());
                historico.add(veiculo);
                System.out.println("Veiculo com placa " + veiculo.getPlaca() + " estacionado na vaga " + vaga.getNumero());
                return true;
            }
        }
        System.out.println("Nenhuma vaga disponivel para o veiculo de tamanho " + veiculo.getTamanho());
        return false;
    }

    public void registrarSaidaVeiculo(String placa) {
        for (Veiculo veiculo : historico) {
            if (veiculo.getPlaca().equalsIgnoreCase(placa) && veiculo.getHoraSaida() == null) {
                veiculo.setHoraSaida(new Date());
                long tempo = veiculo.calcularTempoPermanencia();
                double valor = calcularValor(tempo);
                liberarVaga(veiculo);
                System.out.println("Veiculo com placa " + placa + " saiu. Tempo de permanencia: " + tempo + "h. Valor a pagar: R$ " + valor);
                return;
            }
        }
        System.out.println("Veiculo nao encontrado.");
    }

    private void liberarVaga(Veiculo veiculo) {
        for (Vaga vaga : vagas) {
            if (!vaga.isDisponivel() && vaga.getTamanho().equalsIgnoreCase(veiculo.getTamanho())) {
                vaga.liberar();
                break;
            }
        }
    }

    private double calcularValor(long horas) {
        if (horas <= 1) return 5.0;
        else if (horas <= 3) return 10.0;
        else return 15.0;
    }

    public void gerarRelatorioVagasOcupadas() {
        System.out.println("Relatorio de Vagas Ocupadas:");
        for (Vaga vaga : vagas) {
            if (!vaga.isDisponivel()) {
                System.out.println("Vaga " + vaga.getNumero() + " - Tamanho: " + vaga.getTamanho());
            }
        }
    }

    public void gerarHistoricoVeiculos() {
        System.out.println("Historico de Permanencia:");
        for (Veiculo veiculo : historico) {
            if (veiculo.getHoraSaida() != null) {
                long tempo = veiculo.calcularTempoPermanencia();
                double valor = calcularValor(tempo);
                System.out.println("Placa: " + veiculo.getPlaca() + ", Tempo: " + tempo + "h, Valor pago: R$ " + valor);
            }
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Estacionamento estacionamento = new Estacionamento();

        estacionamento.adicionarVaga(1, "pequeno");
        estacionamento.adicionarVaga(2, "medio");
        estacionamento.adicionarVaga(3, "grande");

        while (true) {
            System.out.println("Escolha uma opcao:");
            System.out.println("1. Registrar entrada de veiculo");
            System.out.println("2. Registrar saida de veiculo");
            System.out.println("3. Relatorio de vagas ocupadas");
            System.out.println("4. Historico de permanencia de veiculos");
            System.out.println("5. Sair");

            int opcao = scanner.nextInt();
            scanner.nextLine();

            switch (opcao) {
                case 1:
                    System.out.println("Informe a placa:");
                    String placa = scanner.nextLine();
                    System.out.println("Informe o modelo:");
                    String modelo = scanner.nextLine();
                    System.out.println("Informe o tamanho (pequeno, medio, grande):");
                    String tamanho = scanner.nextLine();
                    Veiculo veiculo = new Veiculo(placa, modelo, tamanho);
                    estacionamento.registrarEntradaVeiculo(veiculo);
                    break;
                case 2:
                    System.out.println("Informe a placa do veiculo que esta saindo:");
                    String placaSaida = scanner.nextLine();
                    estacionamento.registrarSaidaVeiculo(placaSaida);
                    break;
                case 3:
                    estacionamento.gerarRelatorioVagasOcupadas();
                    break;
                case 4:
                    estacionamento.gerarHistoricoVeiculos();
                    break;
                case 5:
                    System.out.println("Encerrando o sistema.");
                    scanner.close();
                    return;
                default:
                    System.out.println("Opcao invalida.");
                    break;
            }
        }
    }
}
