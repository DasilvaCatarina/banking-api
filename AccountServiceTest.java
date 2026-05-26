package com.catarina.banking;

import com.catarina.banking.dto.AccountDTO;
import com.catarina.banking.model.Account;
import com.catarina.banking.repository.AccountRepository;
import com.catarina.banking.service.AccountService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("AccountService - Testes Unitários")
class AccountServiceTest {

    @Mock
    private AccountRepository accountRepository;

    @InjectMocks
    private AccountService accountService;

    private Account mockAccount;

    @BeforeEach
    void setUp() {
        mockAccount = Account.builder()
                .id(1L)
                .accountNumber("PT1234567890")
                .ownerName("Catarina Silva")
                .balance(new BigDecimal("1000.00"))
                .accountType(Account.AccountType.CHECKING)
                .status(Account.AccountStatus.ACTIVE)
                .build();
    }

    @Test
    @DisplayName("Deve criar conta com sucesso")
    void shouldCreateAccountSuccessfully() {
        AccountDTO.CreateRequest request = new AccountDTO.CreateRequest(
                "Catarina Silva",
                Account.AccountType.CHECKING,
                new BigDecimal("500.00")
        );

        when(accountRepository.existsByAccountNumber(anyString())).thenReturn(false);
        when(accountRepository.save(any(Account.class))).thenReturn(mockAccount);

        AccountDTO.Response response = accountService.createAccount(request);

        assertThat(response).isNotNull();
        assertThat(response.getOwnerName()).isEqualTo("Catarina Silva");
        assertThat(response.getStatus()).isEqualTo(Account.AccountStatus.ACTIVE);
        verify(accountRepository, times(1)).save(any(Account.class));
    }

    @Test
    @DisplayName("Deve lançar exceção quando conta não existe")
    void shouldThrowExceptionWhenAccountNotFound() {
        when(accountRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> accountService.getAccount(99L))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Conta não encontrada");
    }

    @Test
    @DisplayName("Deve retornar conta existente por ID")
    void shouldReturnAccountById() {
        when(accountRepository.findById(1L)).thenReturn(Optional.of(mockAccount));

        AccountDTO.Response response = accountService.getAccount(1L);

        assertThat(response.getId()).isEqualTo(1L);
        assertThat(response.getAccountNumber()).isEqualTo("PT1234567890");
    }

    @Test
    @DisplayName("Deve fechar conta (soft delete)")
    void shouldCloseAccount() {
        when(accountRepository.findById(1L)).thenReturn(Optional.of(mockAccount));
        when(accountRepository.save(any(Account.class))).thenReturn(mockAccount);

        accountService.deleteAccount(1L);

        verify(accountRepository, times(1)).save(argThat(account ->
                account.getStatus() == Account.AccountStatus.CLOSED
        ));
    }
}
