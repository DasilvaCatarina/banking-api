package com.catarina.banking.service;

import com.catarina.banking.dto.AccountDTO;
import com.catarina.banking.model.Account;
import com.catarina.banking.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    @Transactional
    public AccountDTO.Response createAccount(AccountDTO.CreateRequest request) {
        Account account = Account.builder()
                .accountNumber(generateAccountNumber())
                .ownerName(request.getOwnerName())
                .accountType(request.getAccountType())
                .balance(request.getInitialDeposit() != null ? request.getInitialDeposit() : BigDecimal.ZERO)
                .status(Account.AccountStatus.ACTIVE)
                .build();

        Account saved = accountRepository.save(account);
        return toResponse(saved);
    }

    public AccountDTO.Response getAccount(Long id) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Conta não encontrada com id: " + id));
        return toResponse(account);
    }

    public AccountDTO.Response getAccountByNumber(String accountNumber) {
        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException("Conta não encontrada: " + accountNumber));
        return toResponse(account);
    }

    public List<AccountDTO.Response> getAllAccounts() {
        return accountRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public AccountDTO.Response updateAccount(Long id, AccountDTO.UpdateRequest request) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Conta não encontrada com id: " + id));

        if (request.getOwnerName() != null) account.setOwnerName(request.getOwnerName());
        if (request.getStatus() != null) account.setStatus(request.getStatus());

        return toResponse(accountRepository.save(account));
    }

    @Transactional
    public void deleteAccount(Long id) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Conta não encontrada com id: " + id));
        account.setStatus(Account.AccountStatus.CLOSED);
        accountRepository.save(account);
    }

    public Account getAccountEntity(String accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException("Conta não encontrada: " + accountNumber));
    }

    private String generateAccountNumber() {
        String number;
        do {
            number = String.format("PT%010d", new Random().nextLong(9_000_000_000L) + 1_000_000_000L);
        } while (accountRepository.existsByAccountNumber(number));
        return number;
    }

    public AccountDTO.Response toResponse(Account account) {
        return AccountDTO.Response.builder()
                .id(account.getId())
                .accountNumber(account.getAccountNumber())
                .ownerName(account.getOwnerName())
                .balance(account.getBalance())
                .accountType(account.getAccountType())
                .status(account.getStatus())
                .createdAt(account.getCreatedAt())
                .build();
    }
}
