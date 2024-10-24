import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {

    static class Quarto {
        int numero;
        String tipo;
        double precoDiario;
        boolean disponivel;

        public Quarto(int numero, String tipo, double precoDiario) {
            this.numero = numero;
            this.tipo = tipo;
            this.precoDiario = precoDiario;
            this.disponivel = true;
        }

        public void ocupar() {
            this.disponivel = false;
        }

        public void desocupar() {
            this.disponivel = true;
        }
    }

    static class Reserva {
        String nomeHospede;
        String checkIn;
        String checkOut;
        List<Quarto> quartosReservados;

        public Reserva(String nomeHospede, String checkIn, String checkOut, List<Quarto> quartosReservados) {
            this.nomeHospede = nomeHospede;
            this.checkIn = checkIn;
            this.checkOut = checkOut;
            this.quartosReservados = quartosReservados;
        }
    }

    static class Hotel {
        List<Quarto> quartos = new ArrayList<>();
        List<Reserva> reservas = new ArrayList<>();

        public void cadastrarQuarto(int numero, String tipo, double precoDiario) {
            Quarto quarto = new Quarto(numero, tipo, precoDiario);
            quartos.add(quarto);
            System.out.println("Quarto " + numero + " cadastrado com sucesso.");
        }

        public void cadastrarReserva(String nomeHospede, String checkIn, String checkOut, int numQuartos, String tipoQuarto) {
            List<Quarto> quartosDisponiveis = new ArrayList<>();
            
            for (Quarto quarto : quartos) {
                if (quarto.tipo.equalsIgnoreCase(tipoQuarto) && quarto.disponivel) {
                    quartosDisponiveis.add(quarto);
                }
            }

            if (quartosDisponiveis.size() < numQuartos) {
                System.out.println("Nao ha quartos suficientes disponiveis.");
                return;
            }

            List<Quarto> quartosReservados = quartosDisponiveis.subList(0, numQuartos);
            for (Quarto quarto : quartosReservados) {
                quarto.ocupar();
            }

            Reserva reserva = new Reserva(nomeHospede, checkIn, checkOut, quartosReservados);
            reservas.add(reserva);
            System.out.println("Reserva realizada com sucesso para " + nomeHospede + ".");
        }

        public void checkIn(String nomeHospede) {
            for (Reserva reserva : reservas) {
                if (reserva.nomeHospede.equalsIgnoreCase(nomeHospede)) {
                    System.out.println("Check-in realizado para " + nomeHospede + ".");
                    return;
                }
            }
            System.out.println("Reserva nao encontrada para " + nomeHospede + ".");
        }

        public void checkOut(String nomeHospede) {
            Reserva reservaParaRemover = null;

            for (Reserva reserva : reservas) {
                if (reserva.nomeHospede.equalsIgnoreCase(nomeHospede)) {
                    for (Quarto quarto : reserva.quartosReservados) {
                        quarto.desocupar();
                    }
                    reservaParaRemover = reserva;
                    System.out.println("Check-out realizado para " + nomeHospede + ".");
                    break;
                }
            }

            if (reservaParaRemover != null) {
                reservas.remove(reservaParaRemover);
            } else {
                System.out.println("Reserva nao encontrada para " + nomeHospede + ".");
            }
        }

        public void relatorioOcupacao() {
            System.out.println("\nRelatorio de Ocupacao");
            for (Quarto quarto : quartos) {
                if (!quarto.disponivel) {
                    System.out.println("Quarto " + quarto.numero + " (" + quarto.tipo + ") esta ocupado.");
                }
            }
        }

        public void historicoReservas(String nomeHospede) {
            System.out.println("\nHistorico de Reservas");
            for (Reserva reserva : reservas) {
                if (reserva.nomeHospede.equalsIgnoreCase(nomeHospede)) {
                    System.out.println("Reserva para " + nomeHospede + ": ");
                    System.out.println("Check-in: " + reserva.checkIn + ", Check-out: " + reserva.checkOut);
                    System.out.println("Quartos reservados: ");
                    for (Quarto quarto : reserva.quartosReservados) {
                        System.out.println("Quarto " + quarto.numero + " (" + quarto.tipo + ")");
                    }
                }
            }
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Hotel hotel = new Hotel();

        while (true) {
            System.out.println("1. Cadastrar Quarto");
            System.out.println("2. Fazer Reserva");
            System.out.println("3. Check-in");
            System.out.println("4. Check-out");
            System.out.println("5. Relatorio de Ocupacao");
            System.out.println("6. Historico de Reservas");
            System.out.println("7. Sair");
            System.out.print("Escolha uma opcao: ");
            int escolha = scanner.nextInt();
            scanner.nextLine();

            if (escolha == 1) {
                System.out.print("Numero do Quarto: ");
                int numero = scanner.nextInt();
                scanner.nextLine();
                System.out.print("Tipo (solteiro, casal, suite): ");
                String tipo = scanner.nextLine();
                System.out.print("Preco Diario: ");
                double precoDiario = scanner.nextDouble();
                hotel.cadastrarQuarto(numero, tipo, precoDiario);

            } else if (escolha == 2) {
                System.out.print("Nome do Hospede: ");
                String nome = scanner.nextLine();
                System.out.print("Data de Check-in: ");
                String checkIn = scanner.nextLine();
                System.out.print("Data de Check-out: ");
                String checkOut = scanner.nextLine();
                System.out.print("Numero de Quartos: ");
                int numQuartos = scanner.nextInt();
                scanner.nextLine();
                System.out.print("Tipo de Quarto: ");
                String tipoQuarto = scanner.nextLine();
                hotel.cadastrarReserva(nome, checkIn, checkOut, numQuartos, tipoQuarto);

            } else if (escolha == 3) {
                System.out.print("Nome do Hospede: ");
                String nome = scanner.nextLine();
                hotel.checkIn(nome);

            } else if (escolha == 4) {
                System.out.print("Nome do Hospede: ");
                String nome = scanner.nextLine();
                hotel.checkOut(nome);

            } else if (escolha == 5) {
                hotel.relatorioOcupacao();

            } else if (escolha == 6) {
                System.out.print("Nome do Hospede: ");
                String nome = scanner.nextLine();
                hotel.historicoReservas(nome);

            } else if (escolha == 7) {
                break;
            }
        }

        scanner.close();
    }
}
