#include <graphics.h>
#include <conio.h>
#include <windows.h>
#include <stdlib.h>
#include <stdio.h>

int main() {
    int gd = DETECT, gm;
    initgraph(&gd, &gm, "");

    int max_x = getmaxx();
    int max_y = getmaxy();

    int paddle_w = 10;
    int paddle_h = 80;
    int player_x = 50;
    int player_y = max_y / 2 - paddle_h / 2;
    int enemy_x = max_x - 60;
    int enemy_y = max_y / 2 - paddle_h / 2;

    int ball_x = max_x / 2;
    int ball_y = max_y / 2;
    int ball_dx = 4;
    int ball_dy = 3;
    int ball_r = 8;

    int score_player = 0;
    int score_enemy = 0;

    while (!kbhit()) {
        if (GetAsyncKeyState(VK_UP) & 0x8000) {
            player_y -= 6;
        }
        if (GetAsyncKeyState(VK_DOWN) & 0x8000) {
            player_y += 6;
        }

        if (player_y < 0) player_y = 0;
        if (player_y + paddle_h > max_y) player_y = max_y - paddle_h;

        if (ball_y > enemy_y + paddle_h / 2) {
            enemy_y += 4;
        } else {
            enemy_y -= 4;
        }
        if (enemy_y < 0) enemy_y = 0;
        if (enemy_y + paddle_h > max_y) enemy_y = max_y - paddle_h;

        ball_x += ball_dx;
        ball_y += ball_dy;

        if (ball_y - ball_r <= 0 || ball_y + ball_r >= max_y) {
            ball_dy = -ball_dy;
        }

        if (ball_x - ball_r <= player_x + paddle_w && ball_y >= player_y && ball_y <= player_y + paddle_h) {
            ball_dx = -ball_dx;
        }
        if (ball_x + ball_r >= enemy_x && ball_y >= enemy_y && ball_y <= enemy_y + paddle_h) {
            ball_dx = -ball_dx;
        }

        if (ball_x < 0) {
            score_enemy++;
            ball_x = max_x / 2;
            ball_y = max_y / 2;
            ball_dx = -ball_dx;
        }
        if (ball_x > max_x) {
            score_player++;
            ball_x = max_x / 2;
            ball_y = max_y / 2;
            ball_dx = -ball_dx;
        }

        cleardevice();
        rectangle(player_x, player_y, player_x + paddle_w, player_y + paddle_h);
        rectangle(enemy_x, enemy_y, enemy_x + paddle_w, enemy_y + paddle_h);
        circle(ball_x, ball_y, ball_r);

        char score_text[64];
        sprintf(score_text, "Hrac: %d   Souper: %d", score_player, score_enemy);
        outtextxy(max_x / 2 - textwidth(score_text) / 2, 20, score_text);

        delay(10);
    }

    closegraph();
    return 0;
}
